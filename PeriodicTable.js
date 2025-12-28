let allElements;

function createElement(atomic_number, element) {
  let elementBtn = document.createElement("button");
  elementBtn.id = element.symbol;

  elementBtn.classList.add("element-button");
  elementBtn.classList.add(`group-${element.group}`);
  elementBtn.classList.add(`period-${element.period}`);
  elementBtn.classList.add(`block-${element.block}`);
  elementBtn.classList.add(`state-${element.phase}`);
  elementBtn.classList.add(`category-${element.category.replace(/ /g, '-')}`);

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
    elementBtn.classList.remove("state-Solid");
    elementBtn.classList.remove("state-Liquid");
    elementBtn.classList.remove("state-Gas");
    if (current_temperature < element.melting) {
      elementBtn.classList.add("state-Solid");
    } else if (current_temperature < element.boiling) {
      elementBtn.classList.add("state-Liquid");
    } else {
      elementBtn.classList.add("state-Gas");
    }
  }
}

const app = document.getElementById("app");

const table = document.getElementById("periodic-table");
const infoPanel = document.getElementById("info-panel");

// #region control panel
const controlPanel = document.getElementById("control-panel");
controlPanel.addEventListener("animationend", () => { controlPanel.style.animation = 'none' });

const controlNavigation = document.getElementById("control-navigation");
const controlNavIndicator = document.getElementById("control-nav-indicator");

const controlPanelTabContainer = document.getElementById("control-panel-tab-container");

const elementControlsPanel = document.getElementById("element-controls-panel");
const appearanceControlsPanel = document.getElementById("appearance-controls-panel");

const controlShowBtn = document.getElementById("control-show-btn");
controlShowBtn.addEventListener("click", () => {
  if (controlPanel.style.display == "flex") return;
  controlPanel.style.display = "flex";
  controlPanel.style.animation = "slide-in-bottom 0.3s ease";
});

const controlHideBtn = document.getElementById("control-hide-btn");
controlHideBtn.addEventListener("click", () => {
  if (controlPanel.style.display == "none") return;
  controlPanel.style.animation = "slide-out-bottom 0.3s ease";
  controlPanel.addEventListener("animationend", () => { controlPanel.style.display = 'none' }, { once: true });
});

document.querySelectorAll("#control-panel-tab-container .control-slider").forEach((slider) => {
  slider.addEventListener("touchstart", () => {
    controlPanelTabContainer.style.overflowX = "hidden";
  });
  slider.addEventListener("touchend", () => {
    controlPanelTabContainer.style.overflowX = "scroll";
  });
});

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
  if (isElementCentered(elementControlsPanel ,controlPanelTabContainer)) {
    controlNavIndicator.style.width = "80%";
    setTimeout(() => {
      controlNavIndicator.style.justifySelf = "flex-start";
      controlNavIndicator.style.marginLeft = "0";
      controlNavIndicator.style.marginRight = "auto";
      controlNavIndicator.style.width = "40%";
    }, parseFloat(getComputedStyle(app).getPropertyValue("--nav-transition-duration")) * 1000);
    // controlNavIndicator.style.transform = "translateX(0)";
  } else if (isElementCentered(appearanceControlsPanel ,controlPanelTabContainer)) {
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
viewModeSelect.addEventListener("change", () => {
  table.classList.remove("by-state");
  table.classList.remove("by-block");
  table.classList.remove("by-category");
  table.classList.add(viewModeSelect.value);
  document.querySelectorAll(".color-relevance-div").forEach(div => {
    div.style.display = "none";
  });
  document.querySelectorAll(`.color-relevance-div.${viewModeSelect.value}`).forEach(div => {
    div.style.display = "flex";
  });
});

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
  })
});