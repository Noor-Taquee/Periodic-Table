import "./style.css";

import type { ElementData, TableData } from "../../core/data";
import { ElementCell } from "../element-cell";

interface SecondTableProps {
  data: TableData;
  onSelectElement: (element: ElementData) => void;
}

/**
 * Part of the periodic table, containing f block.
 */
export function SecondTable({ data, onSelectElement }: SecondTableProps) {
  const elements = data.filter((element) => element.block === "f");

  return (
    <div className="table-piece" id="second-table">
      {elements.map((element) => (
        <ElementCell
          key={element.symbol}
          element={element}
          onSelectElement={onSelectElement}
        />
      ))}
    </div>
  );
}

export default SecondTable;
