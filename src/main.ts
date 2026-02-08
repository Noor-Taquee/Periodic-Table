import { createElement } from "./utils/UI/create-dom.js";

class tableElement {
  name = "";
  symbol = "";
  atomic_number = "";
  electronic_configuration = "";
  period = "";
  group = "";
  block = "";
  category = "";

  mass = "";
  density = "";
  phase = "";
  boiling = "";
  melting = "";
  electronegativity = "";
  atomic_radius = "";
  year_discovered = "";
}

export let allElements: any;

let focused_element: tableElement;


function createTableElement(atomic_number: string, element: tableElement) {
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
    let parent: HTMLDivElement;
    if (el.block == "f") {
      if (parseFloat(atomic_number) > 88) {
        parent = document.getElementsByClassName(`period 7`)[0] as HTMLDivElement;
      } else {
        parent = document.getElementsByClassName(`period 6`)[0] as HTMLDivElement;
      }
    } else {
      parent = document.getElementsByClassName(`group ${el.group}`)[0] as HTMLDivElement;
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

  function setLabel(id: string, value: string | number): void {
    const el = document.getElementById(id) as HTMLParagraphElement;
    if (el) el.textContent = String(value);
  }

  // header
  setLabel("atomic-number", focused_element.atomic_number);
  setLabel("element-name", focused_element.name);
  setLabel("electronic-configuration", focused_element.electronic_configuration);

  // body
  setLabel("element-symbol-text", focused_element.symbol);
  setLabel("atomic-radius-text", focused_element.atomic_radius);
  setLabel("mass-number-text", `${focused_element.mass} u`);
  setLabel("density-text", focused_element.density);
  setLabel("electronegativity-text", focused_element.electronegativity);
  setLabel("phase-text", focused_element.phase);
  setLabel("period-text", focused_element.period);
  setLabel("group-text", focused_element.group);
  setLabel("block-text", focused_element.block);
  setLabel("category-text", focused_element.category);
  setLabel("year-discovered-text", focused_element.year_discovered);
  setLabel("melting-point-text", `${focused_element.melting} K`);
  setLabel("boiling-point-text", `${focused_element.boiling} K`);
  
  const lernMoreLink = document.getElementById("learn-more-link") as HTMLAnchorElement;
  lernMoreLink.href = `https://en.wikipedia.org/wiki/${focused_element.name}`;
}

export const app = document.getElementById("app") as HTMLDivElement;

export const table = document.getElementById("periodic-table") as HTMLDivElement;
export const infoPanel = document.getElementById("info-panel") as HTMLDivElement;


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