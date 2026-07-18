import type { ElementData } from "../../../core/data";
import "./style.css";

interface InfoPanelProps {
  element: ElementData | null;
}

export function InfoPanel({ element }: InfoPanelProps) {
  if (!element) {
    return (
      <div id="info-panel">Select an element to view its information.</div>
    );
  }

  return (
    <div id="info-panel">
      <div id="info-panel-header">
        <p id="atomic-number">{element.atomicNumber}</p>
        <p id="element-name">{element.name}</p>
        <p id="electronic-configuration">{element.electronicConfiguration}</p>
      </div>
      <div>
        <img id="element-image" />
      </div>
      <div id="info-panel-body">
        <p className="info-body-text">
          Symbol:
          <span id="element-symbol-text" className="info-body-values">
            {element.symbol}
          </span>
        </p>
        <p className="info-body-text">
          Mass Number:
          <span id="mass-number-text" className="info-body-values">
            {element.mass}
          </span>
        </p>
        <p className="info-body-text">
          Period:
          <span id="period-text" className="info-body-values">
            {element.period}
          </span>
        </p>
        <p className="info-body-text">
          Group:
          <span id="group-text" className="info-body-values">
            {element.group}
          </span>
        </p>
        <p className="info-body-text">
          Block:
          <span id="block-text" className="info-body-values">
            {element.block}
          </span>
        </p>
        <p className="info-body-text">
          Category:
          <span id="category-text" className="info-body-values">
            {element.category}
          </span>
        </p>
        <p className="info-body-text">
          Phase:
          <span id="phase-text" className="info-body-values">
            {element.phase}
          </span>
        </p>
        <p className="info-body-text">
          Melting Point:
          <span id="melting-point-text" className="info-body-values">
            {element.meltingPoint}
          </span>
        </p>
        <p className="info-body-text">
          Boiling Point:
          <span id="boiling-point-text" className="info-body-values">
            {element.boilingPoint}
          </span>
        </p>
        <p className="info-body-text">
          Atomic Radius:
          <span id="atomic-radius-text" className="info-body-values">
            {element.atomicRadius}
          </span>
        </p>
        <p className="info-body-text">
          Density:
          <span id="density-text" className="info-body-values">
            {element.density}
          </span>
        </p>
        <p className="info-body-text">
          Electronegativity:
          <span id="electronegativity-text" className="info-body-values">
            {element.electronegativity}
          </span>
        </p>
        <p className="info-body-text">
          Year Discovered:
          <span id="year-discovered-text" className="info-body-values">
            {element.yearDiscovered}
          </span>
        </p>
      </div>
      <a
        className="learn-more-link"
        id="learn-more-link"
        href="https://en.wikipedia.org/wiki"
        target="_blank"
      >
        Learn more
      </a>
    </div>
  );
}

export default InfoPanel;
