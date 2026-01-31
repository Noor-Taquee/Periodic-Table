import { createElement } from "./utils/UI/create-dom.js";

class tableElement {
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

/** @type {tableElement} */ let focused_element;

/**
 * @param {number} atomic_number 
 * @param {object} element 
 */
function createTableElement(atomic_number, element) {
  const elementBtn = createElement("button", { id: element.symbol });

  elementBtn.classList.add("element-button");
  elementBtn.classList.add(`group-${element.group}`);
  elementBtn.classList.add(`period-${element.period}`);
  elementBtn.classList.add(`block-${element.block}`);
  elementBtn.classList.add(`state-${element.phase}`.toLowerCase());
  elementBtn.classList.add(`category-${element.category.replace(/ /g, '-')}`.toLowerCase());

  const div1 = createElement("div", { className: "element-info-div" });
  elementBtn.appendChild(div1);
  // Atomic number
  const atomic_no_p = createElement("p", {
    className: "atomic-number",
    textContent: atomic_number 
  });
  div1.appendChild(atomic_no_p);
  
  const div2 = createElement("div", {
    className: "element-name-div",
  });
  elementBtn.appendChild(div2);
  // Symbol
  const symbol_p = createElement("p", {
    className: "element-symbol",
    textContent: element.symbol,
  });
  div2.appendChild(symbol_p);
  // Name
  const name_p = createElement("p", {
    className: "element-name",
    textContent: element.name,
  });
  div2.appendChild(name_p);

  elementBtn.addEventListener("click", () => {
    focused_element = new tableElement();
    Object.assign(focused_element, element);
    showInfo();
  });

  return elementBtn;
}

function createTable() {
  for (const atomic_number in allElements) {
    const el = allElements[atomic_number];
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

    parent.appendChild(createTableElement(atomic_number, el));
  }
}

async function loadElements() {
  const response = await fetch("assets/elementsData.json");
  const data = await response.json();
  allElements = data;
}

function showInfo() {
  if (!focused_element) return;

  if (infoPanel.style.display == "none") { infoPanel.style.display = "flex" };
  infoPanel.scrollIntoView();

  // header
  document.getElementById("atomic-number").textContent = focused_element.atomic_number;
  document.getElementById("element-name").textContent = focused_element.name;
  document.getElementById("electronic-configuration").textContent = focused_element.electronic_configuration;

  // body
  document.getElementById("element-symbol-text").textContent = focused_element.symbol;
  document.getElementById("atomic-radius-text").textContent = focused_element.atomic_radius;
  document.getElementById("mass-number-text").textContent = `${focused_element.mass} u`;
  document.getElementById("density-text").textContent = focused_element.density;
  document.getElementById("electronegativity-text").textContent = focused_element.electronegativity;
  document.getElementById("phase-text").textContent = focused_element.phase;
  document.getElementById("period-text").textContent = focused_element.period;
  document.getElementById("group-text").textContent = focused_element.group;
  document.getElementById("block-text").textContent = focused_element.block;
  document.getElementById("category-text").textContent = focused_element.category;
  document.getElementById("year-discovered-text").textContent = focused_element.year_discovered;
  document.getElementById("melting-point-text").textContent = focused_element.melting;
  document.getElementById("boiling-point-text").textContent = focused_element.boiling;
  document.getElementById("learn-more-link").href = `https://en.wikipedia.org/wiki/${focused_element.name}`;
}

export function updateElementState() {
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

export const app = document.getElementById("app");

export const table = document.getElementById("periodic-table");
export const infoPanel = document.getElementById("info-panel");


function checkOrientation() {
  app.dataset.orientation = document.body.offsetHeight > document.body.offsetWidth ? "vertical" : "horizontal";
}

window.addEventListener("resize", () => {
  checkOrientation();
});

window.addEventListener("DOMContentLoaded", () => {
  checkOrientation();
  loadElements().then(() => {
    createTable();
  });
});