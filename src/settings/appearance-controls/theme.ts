import { app, updateDeviceColor } from "../../app.js";
import { paletteSelection } from "./palette.js";


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
