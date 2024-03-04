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
  ishospitalLocationMenuDisplay,
  ishospitalMenuDisplay,
  isSymptomMenuDisplay,
  isRoleMenuDisplay,
  isMenuDisplay,
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
              <Link to={`/admin/dashboard`}>
                <FontAwesomeIcon icon={faHouse} /> <span>Dashboard</span>
              </Link>
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
                  <Link to={`/admin/division`}>Division</Link>
                </li>
                <li>
                  <Link to={`/admin/district`}>District</Link>
                </li>
                <li>
                  <Link to={`/admin/station`}>Division</Link>
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
                  <Link to={`/admin/hospitalCategory`}>Hospital Category</Link>
                </li>
                <li>
                  <Link to={`/admin/hospitalApp`}>Hospital App</Link>
                </li>
                <li>
                  <Link to={`/admin/hospitalMap`}>Hospital Map</Link>
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
                  <Link to={`/admin/department`}>Department</Link>
                </li>
                <li>
                  <Link to={`/admin/disease`}>Disease</Link>
                </li>
                <li>
                  <Link to={`/admin/symtoms`}>Symtoms</Link>
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
                  <Link to={`/admin/role`}>Role</Link>
                </li>
                <li>
                  <Link to={`/admin/roleUser`}>Role User</Link>
                </li>
                <li>
                  <Link to={`/admin/rolePermission`}>Role Permission</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <a href="#" onClick={() => changeDisplayMenu("Menu")}>
                <FontAwesomeIcon icon={faUser} /> <span> Menu</span>{" "}
                {isMenuDisplay ? (
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
                  display: isMenuDisplay ? "block" : "none",
                }}
              >
                <li>
                  <Link to={`/admin/menu`}>Menu Operation</Link>
                </li>
                <li>
                  <Link to={`/admin/menuPermission`}>Menu Permission</Link>
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
