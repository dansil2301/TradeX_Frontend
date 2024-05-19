import "./AdminMain.css"
import {StatSection} from "./StatSection/StatSection.jsx";
import {TraderListSection} from "./TraderListSection/TraderListSection.jsx";

export function AdminMain() {
    return (
      <div className="AdminMain">
          <StatSection />
          <TraderListSection />
      </div>
    );
}