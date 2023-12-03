import { useState } from "react";
import PropTypes from 'prop-types'

const SideBarSection = ({
  selectComponent,
}) => {
  const [isDisplayNone, setisDisplayNone] = useState(true);
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li>
              <a href="index.html">
                <i className="fe fe-home"></i> <span>Dashboard</span>
              </a>
            </li>
            <li className="submenu">
              <a href="#" onClick={() => setisDisplayNone(!isDisplayNone)}>
                <i className="fe fe-document"></i> <span> Hospital</span>{" "}
                <span className="menu-arrow"></span>
              </a>
              <ul style={{ display: isDisplayNone ? "none" : "block" }}>
                <li>
                  <a href="#" onClick={() => selectComponent("division")}>
                    Division
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent('district')}>
                    District
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent('station')}>
                    Station
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent('hospitalCtg')}>
                    Hospital Category
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent('hospitalApp')}>
                    Hospital App
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
  setisPrimaryBodyShow: PropTypes.func,
  setisShowDistrict: PropTypes.func,
  selectComponent : PropTypes.func,
};

export default SideBarSection