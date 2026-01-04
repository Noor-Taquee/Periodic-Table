class element {
  constructor() {
    this.name = "";
    this.symbol = "";
    this.atomic_number = "";
    this.electronic_configuration = "";
    this.period = "";
    this.group = "";
    this.block = "";
    this.category = "";

    this.mass = "";
    this.density = "";
    this.phase = "";
    this.boiling = "";
    this.melting = "";
    this.electronegativity = "";
    this.atomic_radius = "";
    this.year_discovered = "";
  }
}

let allElements;
let focused_element;

function createElement(atomic_number, element) {
  let elementBtn = document.createElement("button");
  elementBtn.id = element.symbol;

  elementBtn.classList.add("element-button");
  elementBtn.classList.add(`group-${element.group}`);
  elementBtn.classList.add(`period-${element.period}`);
  elementBtn.classList.add(`block-${element.block}`);
  elementBtn.classList.add(`state-${element.phase}`.toLowerCase());
  elementBtn.classList.add(`category-${element.category.replace(/ /g, '-')}`.toLowerCase());

  let div1 = document.createElement("div");
  div1.className = "element-info-div";
  // Atomic number
  let atomic_no_p = document.createElement("p");
  atomic_no_p.textContent = atomic_number;
  atomic_no_p.className = "atomic-number";
  div1.appendChild(atomic_no_p);
  elementBtn.appendChild(div1);

  let div2 = document.createElement("div");
  div2.className = "element-name-div";
  // Symbol
  let symbol_p = document.createElement("p");
  symbol_p.textContent = element.symbol;
  symbol_p.className = "element-symbol";
  div2.appendChild(symbol_p);
  // Name
  let name_p = document.createElement("p");
  name_p.textContent = element.name;
  name_p.className = "element-name";
  div2.appendChild(name_p);
  elementBtn.appendChild(div2);

  elementBtn.addEventListener("click", () => showInfo(atomic_number, element));

  return elementBtn;
}

function createTable() {
  for (let atomic_number in allElements) {
    let el = allElements[atomic_number];
    let parent;
    if (el.block == "f") {
      if (atomic_number > 88) {
        parent = document.getElementsByClassName(`period 7`)[0];
      } else {
        parent = document.getElementsByClassName(`period 6`)[0];
      }
    } else {
      parent = document.getElementsByClassName(`group ${el.group}`)[0];
    }

    parent.appendChild(createElement(atomic_number, el));
  }
}

async function loadElements() {
  const response = await fetch("elementsData.json");
  const data = await response.json();
  allElements = data;
}

function showInfo(atomic_number, element) {
  if (infoPanel.style.display == "none") { infoPanel.style.display = "flex" };
  infoPanel.scrollIntoView();
  // header elements
  document.getElementById("atomic-number").textContent = atomic_number;
  document.getElementById("element-name").textContent = element.name;
  document.getElementById("electronic-configuration").textContent = element.electronic_configuration;
  // body elements
  document.getElementById("element-symbol-text").textContent = element.symbol;
  document.getElementById("atomic-radius-text").textContent = element.atomic_radius;
  document.getElementById("mass-number-text").textContent = `${element.mass} u`;
  document.getElementById("density-text").textContent = element.density;
  document.getElementById("electronegativity-text").textContent = element.electronegativity;
  document.getElementById("phase-text").textContent = element.phase;
  document.getElementById("period-text").textContent = element.period;
  document.getElementById("group-text").textContent = element.group;
  document.getElementById("block-text").textContent = element.block;
  document.getElementById("category-text").textContent = element.category;
  document.getElementById("year-discovered-text").textContent = element.year_discovered;
  document.getElementById("melting-point-text").textContent = element.melting;
  document.getElementById("boiling-point-text").textContent = element.boiling;
  document.getElementById("learn-more-link").href = `https://en.wikipedia.org/wiki/${element.name}`;
}

function updateElementState() {
  for (let atomic_number in allElements) {
    let element = allElements[atomic_number];
    let elementBtn = document.getElementById(element.symbol);

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

const app = document.getElementById("app");

const table = document.getElementById("periodic-table");
const infoPanel = document.getElementById("info-panel");

// #region control panel
const controlPanel = document.getElementById("control-panel");
controlPanel.addEventListener("animationend", () => { controlPanel.style.animation = 'none' });

const controlResizeHandle = document.getElementById("control-resize-handle");

const controlNavigation = document.getElementById("control-navigation");
const controlNavIndicator = document.getElementById("control-nav-indicator");

const controlPanelTabContainer = document.getElementById("control-panel-tab-container");

const elementControlsPanel = document.getElementById("element-controls-panel");
const appearanceControlsPanel = document.getElementById("appearance-controls-panel");

const controlShowBtn = document.getElementById("control-show-btn");
controlShowBtn.addEventListener("click", showControlPanel);
function showControlPanel() {
  if (controlPanel.style.display == "flex") return;

  controlPanel.style.display = "flex";
  controlPanel.style.animation = (app.classList.contains("vertical")) ? "slide-in-bottom 0.3s ease" : "slide-in-right 0.3s ease";
}

const controlHideBtn = document.getElementById("control-hide-btn");
controlHideBtn.addEventListener("click", hideControlPanel);
function hideControlPanel() {
  if (controlPanel.style.display == "none") return;

  controlPanel.style.animation = (app.classList.contains("vertical")) ? "slide-out-bottom 0.3s ease" : "slide-out-right 0.3s ease";
  controlPanel.addEventListener("animationend", () => { controlPanel.style.display = 'none' }, { once: true });
}

document.querySelectorAll("#control-panel-tab-container .control-slider").forEach((slider) => {
  slider.addEventListener("touchstart", () => { controlPanelTabContainer.style.overflowX = "hidden" });
  slider.addEventListener("touchend", () => { controlPanelTabContainer.style.overflowX = "scroll" });
});

// #region control resize
function handleControlResize(event) {

  // Vertical resizing
  if (app.classList.contains("vertical")) {
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
// #endregion control resize

// #region control navigation
const elementControlsBtn = document.getElementById("element-controls-btn");
elementControlsBtn.addEventListener("click", () => {
  elementControlsPanel.scrollIntoView();
});

const appearanceControlsBtn = document.getElementById("appearance-controls-btn");
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
function isElementCentered(element, scrollParent) {
  const containerRect = scrollParent.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const containerCenter = containerRect.left + containerRect.width / 2;
  const elementCenter = elementRect.left + elementRect.width / 2;

  return Math.abs(containerCenter - elementCenter) <= tolerance;
}
// #endregion control navigation

// #region element controls
let viewModeSelect = document.getElementById("view-mode-dropdown");
viewModeSelect.addEventListener("change", changeViewMode);

function changeViewMode() {
  table.classList.remove("by-state");
  table.classList.remove("by-block");
  table.classList.remove("by-category");
  table.classList.add(viewModeSelect.value);
  document.querySelectorAll(".color-relevance-div").forEach((div) => {
    div.style.display = "none";
  });
  document.querySelectorAll(`.color-relevance-div.${viewModeSelect.value}`).forEach((div) => {
    div.style.display = "flex";
  });
}

let current_temperature = 298;

const temperature_input = document.getElementById("temperature-control-value");
temperature_input.addEventListener("input", () => {
  // Update temperature value to show current temperature
  current_temperature = temperature_input.value;
  temperature_slider.value = current_temperature;
  updateElementState();
});

const temperature_slider = document.getElementById("temperature-slider");
temperature_slider.addEventListener("input", () => {
  // Update temperature value to show current temperature
  current_temperature = temperature_slider.value;
  temperature_input.value = current_temperature;
  updateElementState();
});

// #endregion element controls

// #region appearance controls

function updateDeviceColor() {
  const themeTag = document.querySelector('meta[name="theme-color"]');
  const color = getComputedStyle(app).getPropertyValue("--secondary-bg").trim();
  themeTag.setAttribute("content", color);
}

// #region theme
function chooseTheme(theme, button) {
  if (app.classList.contains(theme)) return;

  document.querySelectorAll(".palette-input").forEach((input) => {
    input.classList.remove(selectedTheme);
    input.classList.add(theme);
  });

  app.classList.remove(selectedTheme);
  selectedThemeIcon.classList.remove("selected");

  selectedTheme = theme;
  selectedThemeIcon = button;

  app.classList.add(selectedTheme);
  selectedThemeIcon.classList.add("selected");

  updateDeviceColor();
}

let selectedTheme;
let selectedThemeIcon;

const lightBtn = document.getElementById("light-btn");
selectedTheme = "light";
selectedThemeIcon = lightBtn;
lightBtn.addEventListener("click", () => { chooseTheme("light", lightBtn) });

const darkBtn = document.getElementById("dark-btn");
darkBtn.addEventListener("click", () => { chooseTheme("dark", darkBtn) });
// #endregion theme

// #region palette
function choosePalette(palette, button) {
  if (app.classList.contains(palette)) return;

  app.classList.remove(selectedPalette);
  selectedPaletteIcon.classList.remove("selected");

  selectedPalette = palette;
  selectedPaletteIcon = button;

  app.classList.add(selectedPalette);
  selectedPaletteIcon.classList.add("selected");
  
  updateDeviceColor();
}

let selectedPalette;
let selectedPaletteIcon;

const blueBtn = document.getElementById("blue-btn");
selectedPalette = "blue";
selectedPaletteIcon = blueBtn;
blueBtn.addEventListener("click", () => { choosePalette("blue", blueBtn) });

const limeBtn = document.getElementById("lime-btn");
limeBtn.addEventListener("click", () => { choosePalette("lime", limeBtn) });

const pinkBtn = document.getElementById("pink-btn");
pinkBtn.addEventListener("click", () => { choosePalette("pink", pinkBtn) });

const purpleBtn = document.getElementById("purple-btn");
purpleBtn.addEventListener("click", () => { choosePalette("purple", purpleBtn) });
// #endregion palette

const elementSize_slider = document.getElementById("element-size-slider");
elementSize_slider.addEventListener("input", () => {
  table.style.setProperty("--element-size-scale", elementSize_slider.value);
});

const elementAtomicNumberScale_slider = document.getElementById("element-atomic-number-slider");
elementAtomicNumberScale_slider.addEventListener("input", () => {
  table.style.setProperty("--element-atomic-number-scale", elementAtomicNumberScale_slider.value);
});

const elementSymbol_slider = document.getElementById("element-symbol-slider");
elementSymbol_slider.addEventListener("input", () => {
  table.style.setProperty("--element-symbol-scale", elementSymbol_slider.value);
});

const elementName_slider = document.getElementById("element-name-slider");
elementName_slider.addEventListener("input", () => {
  table.style.setProperty("--element-name-scale", elementName_slider.value);
});
// #endregion appearance controls
// #endregion control panel


function checkOrientation() {
  if (document.body.offsetHeight > document.body.offsetWidth) {
    app.classList.remove("horizontal");
    app.classList.add("vertical");
  } else {
    app.classList.remove("vertical");
    app.classList.add("horizontal");
  }
}

window.addEventListener("resize", () => {
  checkOrientation();
});

window.addEventListener("DOMContentLoaded", () => {
  checkOrientation();
  loadElements().then(() => {
    createTable();
  });
  changeViewMode();
});