import { app } from "../app.js";
import "./element-controls.js";
import "./appearance-controls/theme.js"
import "./appearance-controls/sliders.js"

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

//#endregion control panel
