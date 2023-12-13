import { useState } from "react";
import BodyComp from "./Body";
import OnLoadComponent from "./OnLoad";


const DigiverseHome = () => {
  const [onLoadView, setonLoadView] = useState(true)
  return (
    <div className="digiverseBody">
      {onLoadView ? (
        <OnLoadComponent setonLoadView={setonLoadView} />
      ) : (
        <BodyComp setonLoadView={setonLoadView} />
      )}
    </div>
  );
};

export default DigiverseHome;
