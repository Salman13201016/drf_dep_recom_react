
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHospital,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const SideBarSection = ({
  selectComponent,
  isDisplayNone,
  setisDisplayNone,
}) => {
  // const [isDisplayNone, setisDisplayNone] = useState(true);
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li>
              <a href="index.html">
                <FontAwesomeIcon icon={faHouse} /> <span>Dashboard</span>
              </a>
            </li>
            <li className="submenu">
              <a href="#" onClick={() => setisDisplayNone(!isDisplayNone)}>
                <FontAwesomeIcon icon={faHospital} /> <span> Hospital</span>{" "}
                {isDisplayNone ? (
                  <span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </span>
                )}
              </a>
              <ul style={{ display: isDisplayNone ? "none" : "block" }}>
                <li>
                  <a href="#" onClick={() => selectComponent("division")}>
                    Division
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent("district")}>
                    District
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent("station")}>
                    Station
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent("hospitalCtg")}>
                    Hospital Category
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent("hospitalApp")}>
                    Hospital App
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent("hospitalmap")}>
                    Hospital Map
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

SideBarSection.propTypes = {
  setisDisplayNone: PropTypes.func,
  selectComponent: PropTypes.func,
  isDisplayNone : PropTypes.bool
};

export default SideBarSection