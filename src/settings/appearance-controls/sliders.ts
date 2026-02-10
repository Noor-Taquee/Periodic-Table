import { table } from "../../main.js";


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
