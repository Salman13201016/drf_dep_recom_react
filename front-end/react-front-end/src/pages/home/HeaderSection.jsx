import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {
  faAlignLeft,
  faBell,
} from "@fortawesome/free-solid-svg-icons";



const HeaderSection = ({makeDefaultMenu}) => {
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const handleLogOut = () =>{
    const logOutInfo = {
      user_name: "",
      role: "",
      role_permissions: {
        view: false,
        insert: false,
        edit: false,
        delete: false,
      },
      message: "Logout successful",
    };

    sessionStorage.setItem("loginInfo", JSON.stringify(logOutInfo));
    window.location.reload();
  }



  return (
    <div className="header">
      <div className="header-left">
        <a href="#" className="logo">
          {/* <img src="/src/assets/img/logo.png" alt="Logo" /> */}
        </a>
        <a href="#" className="logo logo-small">
          {/* <img
            src="/src/assets/img/logo-small.png"
            alt="Logo"
            width="30"
            height="30"
          /> */}
        </a>
      </div>

      <a href="#" id="toggle_btn" onClick={makeDefaultMenu}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </a>

      <a className="mobile_btn" id="mobile_btn">
        <i className="fa fa-bars"></i>
      </a>

      <ul className="nav user-menu">
        <li className="nav-item dropdown noti-dropdown">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            <FontAwesomeIcon icon={faBell} />{" "}
            <span className="badge badge-pill">3</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="#" className="clear-noti">
                {" "}
                Clear All{" "}
              </a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <a href="#">
                    <div className="media">
                      <span className="avatar avatar-sm">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="/src/assets/img/doctors/doctor-thumb-01.jpg"
                        />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Dr. Ruby Perrin</span>{" "}
                          Schedule{" "}
                          <span className="noti-title">her appointment</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media">
                      <span className="avatar avatar-sm">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="/src/assets/img/patients/patient1.jpg"
                        />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Charlene Reed</span> has
                          booked her appointment to{" "}
                          <span className="noti-title">Dr. Ruby Perrin</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">6 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media">
                      <span className="avatar avatar-sm">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="/src/assets/img/patients/patient2.jpg"
                        />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Travis Trimble</span>{" "}
                          sent a amount of $210 for his{" "}
                          <span className="noti-title">appointment</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">8 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media">
                      <span className="avatar avatar-sm">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="/src/assets/img/patients/patient3.jpg"
                        />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Carl Kelly</span> send a
                          message{" "}
                          <span className="noti-title"> to his doctor</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">12 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="#">View all Notifications</a>
            </div>
          </div>
        </li>

        <li className="nav-item dropdown has-arrow">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            <span className="user-img">
              <img
                className="rounded-circle"
                src="/src/assets/img/profiles/avatar-01.jpg"
                width="31"
                alt="Ryan Taylor"
              />
            </span>
          </a>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm">
                <img
                  src="/src/assets/img/profiles/avatar-01.jpg"
                  alt="User Image"
                  className="avatar-img rounded-circle"
                />
              </div>
              <div className="user-text">
                <h6>
                  {userProfile.user_name ? userProfile.user_name : "No User"}
                </h6>
                <p className="text-muted mb-0">
                  {userProfile.role ? userProfile.role : "No Role"}
                </p>
              </div>
            </div>
            <a className="dropdown-item" href="profile.html">
              My Profile
            </a>
            <a className="dropdown-item" href="settings.html">
              Settings
            </a>
            <button className="dropdown-item" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

HeaderSection.propTypes = {
  makeDefaultMenu: PropTypes.func,
};
export default HeaderSection;