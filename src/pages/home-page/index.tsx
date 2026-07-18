import { PeriodicTable } from "./periodic-table";
import InfoPanel from "./info-panel";
import type { ElementData } from "../../core/data";
import { useState } from "react";

export function HomePage() {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(
    null,
  );

  return (
    <div id="home-page" className="app-panel">
      <div className="panel-bar">
        <div className="panel-name-div">
          <h1 className="panel-names">Periodic Table</h1>
        </div>
      </div>
      <div className="panel-content">
        <PeriodicTable onSelectElement={setSelectedElement} />
        <InfoPanel element={selectedElement} />
      </div>
    </div>
  );
}

export default HomePage;
