let allElements;

function loadElements() {
  return fetch("elementsData.json")
    .then((response) => response.json())
    .then((data) => {
      allElements = data;
    });
}

let table = document.getElementById("periodic-table");
let infoPanel = document.getElementById("info-panel");

let current_temperature = 298;
let temperature_input = document.getElementById("temperature-control-value");
temperature_input.addEventListener("input", () => {
  current_temperature = temperature_input.value;
  temperature_slider.value = current_temperature;
  updateElementState();
});
let temperature_slider = document.getElementById("temperature-slider");
temperature_slider.addEventListener("input", () => {
  current_temperature = temperature_slider.value;
  temperature_input.value = current_temperature;
  updateElementState();
});

function showInfo(atomic_number, element) {
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

function createElement(atomic_number, element) {
  let elementBtn = document.createElement("button");
  elementBtn.id = element.symbol;
  elementBtn.classList.add("by-state");
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

let viewModeSelect = document.getElementById("view-mode-select");
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