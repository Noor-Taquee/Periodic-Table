import { createElement } from "../utils/UI/create-dom.js";
import { app } from "../main.js";
import { allElements, table } from "../main.js";

//#region control panel
const controlPanel = document.getElementById("control-panel") as HTMLDivElement;
controlPanel.addEventListener("animationend", () => { controlPanel.style.animation = 'none' });

const controlResizeHandle = document.getElementById("control-resize-handle") as HTMLDivElement;

// const controlNavigation = document.getElementById("control-navigation");
const controlNavIndicator = document.getElementById("control-nav-indicator") as HTMLDivElement;

const controlPanelTabContainer = document.getElementById("control-panel-tab-container") as HTMLDivElement;

const elementControlsPanel = document.getElementById("element-controls-panel") as HTMLDivElement;
const appearanceControlsPanel = document.getElementById("appearance-controls-panel") as HTMLDivElement;

const controlShowBtn = document.getElementById("control-show-btn") as HTMLButtonElement;
controlShowBtn.addEventListener("click", showControlPanel);

function showControlPanel() {
  if (controlPanel.style.display == "flex") return;

  controlPanel.style.display = "flex";
  controlPanel.style.animation = (app.dataset.orientation == "vertical") ? "slide-in-bottom 0.3s ease" : "slide-in-right 0.3s ease";
}

const controlHideBtn = document.getElementById("control-hide-btn") as HTMLButtonElement;
controlHideBtn.addEventListener("click", hideControlPanel);
function hideControlPanel() {
  if (controlPanel.style.display == "none") return;

  controlPanel.style.animation = (app.dataset.orientation == "vertical") ? "slide-out-bottom 0.3s ease" : "slide-out-right 0.3s ease";
  controlPanel.addEventListener("animationend", () => { controlPanel.style.display = 'none' }, { once: true });
}

controlPanelTabContainer.querySelectorAll(".control-slider").forEach((slider) => {
  slider.addEventListener("touchstart", () => { controlPanelTabContainer.style.overflowX = "hidden" });
  slider.addEventListener("touchend", () => { controlPanelTabContainer.style.overflowX = "scroll" });
});

//#region control resize
function handleControlResize(event: PointerEvent) {

  // Vertical resizing
  if (app.dataset.orientation == "vertical") {
    const dY = window.innerHeight - event.clientY;

    // If the panel becomes too short, hide it
    if (dY <= 100) {
      hideControlPanel();
      controlPanel.style.height = "200px";
      return;
    };

    controlPanel.style.height = (event.clientY <= 50) ? `${window.innerHeight}px` : `${dY}px`;
  }

  // Horizontal resizing
  else {
    const dX = window.innerWidth - event.clientX;

    if (dX <= 100) {
      hideControlPanel();
      controlPanel.style.width = "200px";
      return;
    };

    controlPanel.style.width = (event.clientX <= 50) ? `${window.innerWidth}px` : `${dX}px`;
  }

}

controlResizeHandle.addEventListener("pointerdown", (event) => {
  controlResizeHandle.setPointerCapture(event.pointerId);
  controlResizeHandle.addEventListener("pointermove", handleControlResize);
});

controlResizeHandle.addEventListener("pointerup", (event) => {
  controlResizeHandle.releasePointerCapture(event.pointerId);
  controlResizeHandle.removeEventListener("pointermove", handleControlResize);
});
//#endregion control resize

//#region control navigation
const elementControlsBtn = document.getElementById("element-controls-btn") as HTMLButtonElement;
elementControlsBtn.addEventListener("click", () => {
  elementControlsPanel.scrollIntoView();
});

const appearanceControlsBtn = document.getElementById("appearance-controls-btn") as HTMLButtonElement;
appearanceControlsBtn.addEventListener("click", () => {
  appearanceControlsPanel.scrollIntoView();
});

controlPanelTabContainer.addEventListener("scroll", () => {
  if (isElementCentered(elementControlsPanel, controlPanelTabContainer) && controlNavIndicator.style.marginLeft === "auto") {
    controlNavIndicator.style.width = "80%";
    setTimeout(() => {
      controlNavIndicator.style.justifySelf = "flex-start";
      controlNavIndicator.style.marginLeft = "0";
      controlNavIndicator.style.marginRight = "auto";
      controlNavIndicator.style.width = "40%";
    }, parseFloat(getComputedStyle(app).getPropertyValue("--nav-transition-duration")) * 1000);
    // controlNavIndicator.style.transform = "translateX(0)";
  }

  else if (isElementCentered(appearanceControlsPanel, controlPanelTabContainer) && controlNavIndicator.style.marginRight === "auto") {
    controlNavIndicator.style.width = "80%";
    setTimeout(() => {
      controlNavIndicator.style.justifySelf = "flex-end";
      controlNavIndicator.style.marginRight = "0";
      controlNavIndicator.style.marginLeft = "auto";
      controlNavIndicator.style.width = "40%";
    }, parseFloat(getComputedStyle(app).getPropertyValue("--nav-transition-duration")) * 1000);
    // controlNavIndicator.style.transform = "translateX(100%)";
  }
});

const tolerance = 1;
function isElementCentered(element: HTMLElement, scrollParent: HTMLElement) {
  const containerRect = scrollParent.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const containerCenter = containerRect.left + containerRect.width / 2;
  const elementCenter = elementRect.left + elementRect.width / 2;

  return Math.abs(containerCenter - elementCenter) <= tolerance;
}
//#endregion control navigation

//#region element controls
const viewModeSelect = document.getElementById("view-mode-dropdown") as HTMLSelectElement;
window.addEventListener("DOMContentLoaded", changeViewMode);
viewModeSelect.addEventListener("change", changeViewMode);

function changeViewMode() {
  table.classList.remove("by-state");
  table.classList.remove("by-block");
  table.classList.remove("by-category");
  
  table.classList.add(viewModeSelect.value);
  
  document.querySelectorAll<HTMLDivElement>(".color-relevance-div").forEach(div => {
    div.style.display = "none";
  });
  document.querySelectorAll<HTMLDivElement>(`.color-relevance-div.${viewModeSelect.value}`).forEach(div => {
    div.style.display = "flex";
  });
}

export function updateElementState() {
  for (let atomic_number in allElements) {
    let element = allElements[atomic_number];
    let elementBtn = document.getElementById(element.symbol) as HTMLButtonElement;

    // remove existing state
    elementBtn.classList.remove("state-solid");
    elementBtn.classList.remove("state-liquid");
    elementBtn.classList.remove("state-gas");

    // add calculated state
    if (current_temperature < element.melting) {
      elementBtn.classList.add("state-solid");
    } else if (current_temperature < element.boiling) {
      elementBtn.classList.add("state-liquid");
    } else {
      elementBtn.classList.add("state-gas");
    }
  }
}

let current_temperature = "298";

const temperature_input = document.getElementById("temperature-control-value") as HTMLInputElement;
temperature_input.addEventListener("input", () => {
  current_temperature = temperature_input.value;
  // Update temperature value to show current temperature
  temperature_slider.value = current_temperature;
  updateElementState();
});

const temperature_slider = document.getElementById("temperature-slider") as HTMLInputElement;
temperature_slider.addEventListener("input", () => {
  current_temperature = temperature_slider.value;
  // Update temperature value to show current temperature
  temperature_input.value = current_temperature;
  updateElementState();
});

//#endregion element controls

//#region appearance controls

function updateDeviceColor() {
  const themeTag = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
  const color = getComputedStyle(app).getPropertyValue("--secondary-bg").trim();
  themeTag.setAttribute("content", color);
}

//#region theme
// depends [ app, paletteSection, updateDeviceColor]

function chooseTheme(theme: string, button: HTMLElement) {
  if (app.dataset.theme == theme) return;

  paletteSelection.querySelectorAll<HTMLDivElement>(".palette-input").forEach((input) => {
    input.dataset.theme = theme;
  });

  themeSelection.querySelectorAll<HTMLDivElement>(".selected").forEach((selectedThemeIcon) => {
    selectedThemeIcon.classList.remove("selected");
  });

  app.dataset.theme = theme;
  button.classList.add("selected");

  updateDeviceColor();
}

const themeSelection = document.getElementById("theme-control-div") as HTMLDivElement;

const lightBtn = document.getElementById("light-btn") as HTMLDivElement;
lightBtn.addEventListener("click", () => { chooseTheme("light", lightBtn) });

const darkBtn = document.getElementById("dark-btn") as HTMLDivElement;
darkBtn.addEventListener("click", () => { chooseTheme("dark", darkBtn) });
//#endregion theme

//#region palette
// depends [ app, updateDeviceColor ]

function choosePalette(palette: string, button: HTMLDivElement) {
  if (app.dataset.palette == palette) return;

  paletteSelection.querySelectorAll(".selected").forEach(selectedPaletteIcon => {
    selectedPaletteIcon.classList.remove("selected");
  });

  app.dataset.palette = palette;
  button.classList.add("selected");

  updateDeviceColor();
}

const paletteSelection = document.getElementById("palette-control-div") as HTMLDivElement;

const blueBtn = document.getElementById("blue-btn") as HTMLDivElement;
blueBtn.addEventListener("click", () => { choosePalette("blue", blueBtn) });

const limeBtn = document.getElementById("lime-btn") as HTMLDivElement;
limeBtn.addEventListener("click", () => { choosePalette("lime", limeBtn) });

const pinkBtn = document.getElementById("pink-btn") as HTMLDivElement;
pinkBtn.addEventListener("click", () => { choosePalette("pink", pinkBtn) });

const purpleBtn = document.getElementById("purple-btn") as HTMLDivElement;
purpleBtn.addEventListener("click", () => { choosePalette("purple", purpleBtn) });
//#endregion palette


//#region sliders
// depends [table]
const elementSize_slider = document.getElementById("element-size-slider") as HTMLInputElement;
elementSize_slider.addEventListener("input", () => {
  table.style.setProperty("--element-size-scale", elementSize_slider.value);
});

const elementAtomicNumberScale_slider = document.getElementById("element-atomic-number-slider") as HTMLInputElement;
elementAtomicNumberScale_slider.addEventListener("input", () => {
  table.style.setProperty("--element-atomic-number-scale", elementAtomicNumberScale_slider.value);
});

const elementSymbol_slider = document.getElementById("element-symbol-slider") as HTMLInputElement;
elementSymbol_slider.addEventListener("input", () => {
  table.style.setProperty("--element-symbol-scale", elementSymbol_slider.value);
});

const elementName_slider = document.getElementById("element-name-slider") as HTMLInputElement;
elementName_slider.addEventListener("input", () => {
  table.style.setProperty("--element-name-scale", elementName_slider.value);
});
//#endregion sliders

//#endregion appearance controls
//#endregion control panel
