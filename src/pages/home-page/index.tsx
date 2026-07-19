import { useEffect } from "react";
import { changeHash, type InnerRoute } from "../../utils/router";
import { ModernTable } from "./modern-table";

const routes = ["", "modern", "mandeleevs", "triads", "octaves"];

interface HomePageProps {
  route: InnerRoute;
}

export function HomePage({ route }: HomePageProps) {
  const [location, attribute] = route;

  const panel = location[0] || "modern";

  const innerRoute: InnerRoute = [location.slice(1), attribute];

  useEffect(() => {
    const panel = location[0];

    if (!routes.includes(panel)) {
      changeHash("home/modern");
      return;
    }
  }, [location]);

  return (
    <div id="home-page" className="app-panel">
      <div className="panel-bar">
        <div className="panel-name-div">
          <h1 className="panel-names">Periodic Table</h1>
        </div>
      </div>
      <div className="panel-content">
        {(panel == "" || panel == "modern") && (
          <ModernTable route={innerRoute} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
