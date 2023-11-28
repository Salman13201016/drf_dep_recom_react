


const SideNav = () => {


  return (
    <div>
      <div className="main-wrapper">
        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li className="active">
                  <a href="#">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fe fe-layout"></i> <span>Appointments</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fe fe-users"></i> <span>Specialities</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fe fe-user-plus"></i> <span>Doctors</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fe fe-user"></i> <span>Patients</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fe fe-star-o"></i> <span>Reviews</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fe fe-activity"></i> <span>Transactions</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fe fe-vector"></i> <span>Settings</span>
                  </a>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fe fe-document"></i> <span> Reports</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={{ display: 'none' }}>
                    <li>
                      <a href="#">Invoice Reports</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
