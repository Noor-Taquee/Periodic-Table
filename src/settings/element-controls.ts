import { table, allElements } from "../main.js";

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