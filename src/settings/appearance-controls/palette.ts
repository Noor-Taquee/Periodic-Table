import { app, updateDeviceColor } from "../../app.js";


function choosePalette(palette: string, button: HTMLDivElement) {
  if (app.dataset.palette == palette) return;

  paletteSelection.querySelectorAll(".selected").forEach(selectedPaletteIcon => {
    selectedPaletteIcon.classList.remove("selected");
  });

  app.dataset.palette = palette;
  button.classList.add("selected");

  updateDeviceColor();
}

export const paletteSelection = document.getElementById("palette-control-div") as HTMLDivElement;

const blueBtn = document.getElementById("blue-btn") as HTMLDivElement;
blueBtn.addEventListener("click", () => { choosePalette("blue", blueBtn) });

const limeBtn = document.getElementById("lime-btn") as HTMLDivElement;
limeBtn.addEventListener("click", () => { choosePalette("lime", limeBtn) });

const pinkBtn = document.getElementById("pink-btn") as HTMLDivElement;
pinkBtn.addEventListener("click", () => { choosePalette("pink", pinkBtn) });

const purpleBtn = document.getElementById("purple-btn") as HTMLDivElement;
purpleBtn.addEventListener("click", () => { choosePalette("purple", purpleBtn) });
