import { useState } from "react";
import type { InnerRoute } from "../../../utils/router";

import type { ElementData } from "../../../core/data";

import InfoPanel from "./info-panel";
import PeriodicTable from "./periodic-table";

interface ModernTableProps {
  route?: InnerRoute;
}

export function ModernTable({ route }: ModernTableProps) {

  const [selectedElement, setSelectedElement] = useState<ElementData | null>(
    null
  );

  return (
    <div id="modern-table">
      <PeriodicTable onSelectElement={setSelectedElement} />
      {selectedElement && <InfoPanel element={selectedElement} />}
    </div>
  );
}
