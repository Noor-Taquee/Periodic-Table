import "./App.css";

import { useEffect, useState } from "react";
import { changeHash, normalize } from "./utils/router";
import { HomePage } from "./pages/home-page";

const routeTable: string[] = ["", "home", "settings"];

export function App() {
  const [panel, setPanel] = useState<string>("home");
  const [innerRoute, setInnerRoute] = useState<[string[], string[]]>([[], []]);

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash;
      const [location, attributes] = normalize(rawHash);

      const currentLocation = location[0];

      if (!routeTable.includes(currentLocation)) {
        changeHash("home");
        setPanel("home");
        setInnerRoute([[], []]);
        return;
      }

      setPanel(location[0]);
      setInnerRoute([location.slice(1), attributes]);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("load", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("load", handleHashChange);
    };
  }, []);

  return (
    <>
      <div className="panel-container">
        {panel === "home" && <HomePage route={innerRoute} />}
        {/* {panel === "settings" && <SettingsPage />} */}
      </div>
    </>
  );
}

export default App;
