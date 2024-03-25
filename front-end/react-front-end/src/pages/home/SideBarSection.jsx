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
import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { replaceClassWithClassName } from "../../utils/utils";
const SideBarSection = ({
  ishospitalLocationMenuDisplay,
  ishospitalMenuDisplay,
  isSymptomMenuDisplay,
  isRoleMenuDisplay,
  isMenuDisplay,
  changeDisplayMenu,
}) => {
  const { menu, menuPermission } = useStoreState((state) => state);
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const userRole = userProfile.role;
  const permissionArray = menuPermission.menuPermissionList.filter(
    (item) => item.role_name == userRole
  );
  const [permissionObject, setpermissionObject] = useState("");

  useEffect(() => {
    setpermissionObject(permissionArray[0]);
  }, [permissionArray]);


  return (
    <div className="mainSideBar sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          {/* previous hard coded menu */}
          {/* <ul>
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
                  <Link to={`/admin/station`}>Station</Link>
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
                  <Link to={`/admin/menuInput`}>Menu Input</Link>
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
          </ul> */}

          {/* previous dynamic  menu */}
          {/* <ul>
            {menu.menuList.map((singleMenu, index) => {
              return (
                <li className="submenu" key={index}>
                  <Link>{singleMenu.menu_name}</Link>
                  {singleMenu.submenus.length && (
                    <ul>
                      {singleMenu.submenus.map((singleSubMenu, index) => {
                        return (
                          <li key={index}>{singleSubMenu.submenu_name}</li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul> */}


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
            </ul>

            {/* dynamic  menu  by chat gpt*/}
            <ul className="nav">
              {menu.menuList.map((singleMenu, index) => {
                return (
                  <li className="nav-item d-block w-100" key={index}>
                    {singleMenu.submenus.length > 0 ? (
                      <div className="dropdown mb-2">
                        {/* menu execute that have sub menu */}
                        {permissionObject &&
                          permissionObject.menu_names.includes(
                            singleMenu.menu_name
                          ) && (
                            <Link
                              className="nav-link dropdown-toggle d-block"
                              to="#"
                              id={`menu-${index}`}
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {/* {singleMenu.menu_icon} */}
                              <span>{singleMenu.menu_name}</span>
                            </Link>
                          )}

                        {/* <Link
                        className="nav-link dropdown-toggle d-block"
                        to="#"
                        id={`menu-${index}`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {singleMenu.menu_name}
                      </Link> */}

                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`menu-${index}`}
                        >
                          {singleMenu.submenus.map(
                            (singleSubMenu, subIndex) => {
                              return (
                                <li key={subIndex}>
                                  {permissionObject &&
                                    permissionObject.submenu_names.includes(
                                      singleSubMenu.submenu_name
                                    ) && (
                                      <Link
                                        className="dropdown-item submenu text-dark"
                                        to={singleSubMenu.submenu_url}
                                      >
                                        {singleSubMenu.submenu_name}
                                      </Link>
                                    )}
                                  {/* <Link
                                className="dropdown-item submenu text-dark"
                                to={singleSubMenu.submenu_url}
                              >
                                {singleSubMenu.submenu_name}
                              </Link> */}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    ) : (
                      // menu execute that does not have sub menu
                      permissionObject &&
                      permissionObject.menu_names.includes(
                        singleMenu.menu_name
                      ) && (
                        <Link
                          className="nav-link d-block w-100"
                          to={singleMenu.menu_url}
                        >
                          {singleMenu.menu_name}
                        </Link>
                      )
                    )}
                  </li>
                );
              })}
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
