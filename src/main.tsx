import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { App } from "./App";

const root = document.getElementById("root") as HTMLDivElement;

root.dataset.theme = "light";
root.dataset.palette = "blue";

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
