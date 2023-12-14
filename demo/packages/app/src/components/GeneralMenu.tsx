import * as React from "react";
import { ExtensionSlot } from "piral-core";

const GeneralMenu: React.FC = () => {
  return (
    <div id="navigation" className="Navigation">
      <nav>
        <ExtensionSlot
          name="menu"
          render={(nodes) => (
            <ul>
              {nodes.map((node, i) => (
                <li key={i}>{node}</li>
              ))}
            </ul>
          )}
        />
      </nav>
    </div>
  );
};

export default GeneralMenu;
