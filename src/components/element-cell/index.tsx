import "./style.css";

import type { ElementData } from "../../core/data";
// import { changeHash } from "../../router";

interface ElementCellProps {
  element: ElementData;
  onSelectElement: (s: ElementData) => void;
}

const padding = 2;

export function ElementCell({ element, onSelectElement }: ElementCellProps) {
  let column = Number(element.group);
  let row = Number(element.period);

  if (element.block == "f") {
    if (element.period == "6") {
      // for lanthanides(58-71)
      column = element.atomicNumber - 57 + padding;
      row = 1;
    } else if (element.period == "7") {
      //  for actinides(90-103)
      column = element.atomicNumber - 89 + padding;
      row = 2;
    }
  }

  return (
    <div
      className={`element-cell group-${element.group} block-${element.block}`}
      id={element.symbol}
      style={{
        gridColumn: column,
        gridRow: row,
      }}
      onClick={() => onSelectElement(element)}
    >
      <div className="element-info-div">
        <p className="atomic-number">{element.atomicNumber}</p>
      </div>
      <div className="element-name-div">
        <p className="element-symbol">{element.symbol}</p>
        <p className="element-name">{element.name}</p>
      </div>
    </div>
  );
}
