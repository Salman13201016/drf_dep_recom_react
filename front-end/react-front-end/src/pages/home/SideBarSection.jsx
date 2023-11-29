import { useState } from "react";
import PropTypes from 'prop-types'

const SideBarSection = ({
  setisPrimaryBodyShow,
  setisShowDistrict,
}) => {
  const [isDisplayNone, setisDisplayNone] = useState(true);
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            {/* <li className="menu-title">
              <span>Main</span>
            </li> */}
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
                  <a
                    href="#"
                    onClick={() => setisPrimaryBodyShow(false)}
                  >
                    Division
                  </a>
                </li>
                <li>
                  <a href="#" onClick={()=>setisShowDistrict(true)} >District</a>
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
};

export default SideBarSection