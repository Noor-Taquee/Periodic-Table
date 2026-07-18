import "./style.css";

import type { ElementData, TableData } from "../../core/data";
import { ElementCell } from "../element-cell";

interface MainTableProps {
  data: TableData;
  onSelectElement: (s: ElementData) => void;
}

/**
 * Part of the periodic table, containing s, p & d blocks.
 */
export function MainTable({ data, onSelectElement }: MainTableProps) {
  const mainElements = data.filter((element) => element.block !== "f");

  return (
    <div className="table-piece" id="main-table">
      {mainElements.map((element) => (
        <ElementCell
          key={element.symbol}
          element={element}
          onSelectElement={onSelectElement}
        />
      ))}
    </div>
  );
}

export default MainTable;
