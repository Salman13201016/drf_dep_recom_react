import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHospital,
  faChevronUp,
  faChevronDown,
  faUserDoctor,
  faLocationCrosshairs,
  faBuilding,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const SideBarSection = ({
  selectComponent,
  ishospitalLocationMenuDisplay,
  ishospitalMenuDisplay,
  isSymptomMenuDisplay,
  isRoleMenuDisplay,
  changeDisplayMenu,
}) => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li>
              <a href="#">
                <span>
                  <img
                    src="../../../src/assets/img/logo/White-DigiVerse-Logo1.png"
                    alt=""
                  />
                </span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => selectComponent("dashboard")}>
                <FontAwesomeIcon icon={faHouse} /> <span>Dashboard</span>
              </a>
            </li>
            <li className="submenu">
              <a href="#" onClick={() => changeDisplayMenu("hospitalLocation")}>
                <FontAwesomeIcon icon={faLocationCrosshairs} />{" "}
                <span> Hospital Location</span>{" "}
                {ishospitalLocationMenuDisplay ? (
                  <span>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                )}
              </a>
              <ul
                style={{
                  display: ishospitalLocationMenuDisplay ? "block" : "none",
                }}
              >
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
              </ul>
            </li>

            <li className="submenu">
              <a href="#" onClick={() => changeDisplayMenu("hospitalMenu")}>
                <FontAwesomeIcon icon={faHospital} />{" "}
                <span> Hospital Menu</span>{" "}
                {ishospitalMenuDisplay ? (
                  <span>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                )}
              </a>
              <ul
                style={{
                  display: ishospitalMenuDisplay ? "block" : "none",
                }}
              >
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

            <li className="submenu">
              <a href="#" onClick={() => changeDisplayMenu("symptomMenu")}>
                <FontAwesomeIcon icon={faBuilding} /> <span> Symptom</span>{" "}
                {isSymptomMenuDisplay ? (
                  <span>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                )}
              </a>
              <ul
                style={{
                  display: isSymptomMenuDisplay ? "block" : "none",
                }}
              >
                <li>
                  <a href="#" onClick={() => selectComponent("department")}>
                    Department
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent("disease")}>
                    Disease
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent("symtoms")}>
                    Symtoms
                  </a>
                </li>
              </ul>
            </li>

            <li className="submenu">
              <a href="#" onClick={() => changeDisplayMenu("roleMenu")}>
                <FontAwesomeIcon icon={faUser} /> <span> Role</span>{" "}
                {isRoleMenuDisplay ? (
                  <span>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                )}
              </a>
              <ul
                style={{
                  display: isRoleMenuDisplay ? "block" : "none",
                }}
              >
                <li>
                  <a href="#" onClick={() => selectComponent("role")}>
                    Role
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => selectComponent("roleUser")}>
                    Role User
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <Link to={"/digiverse"}>
                <FontAwesomeIcon icon={faUserDoctor} /> <span> Digiverse</span>{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

SideBarSection.propTypes = {
  selectComponent: PropTypes.func,
  changeDisplayMenu: PropTypes.func,
  ishospitalLocationMenuDisplay: PropTypes.bool,
  ishospitalMenuDisplay: PropTypes.bool,
  isSymptomMenuDisplay: PropTypes.bool,
  isRoleMenuDisplay: PropTypes.bool,
};

export default SideBarSection;
