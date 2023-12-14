import * as React from "react";
import { Link } from "react-router-dom";

const GeneralMenu: React.FC = () => {
  return (
    <div id="navigation" className="Navigation">
      <nav>
        <ul>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default GeneralMenu;
