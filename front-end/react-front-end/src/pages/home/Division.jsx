

const Division = () => {
  return (
    <div>
      <div className="main-wrapper">
        <div className="header">
          <div className="header-left">
            <a href="index.html" className="logo">
              <img src="assets/img/logo.png" alt="Logo" />
            </a>
            <a href="index.html" className="logo logo-small">
              <img
                src="assets/img/logo-small.png"
                alt="Logo"
                width="30"
                height="30"
              />
            </a>
          </div>

          <a href="#" id="toggle_btn">
            <i className="fe fe-text-align-left"></i>
          </a>

          <div className="top-nav-search">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search here"
              />
              <button className="btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>

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
                <i className="fe fe-bell"></i>{" "}
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
                              src="assets/img/doctors/doctor-thumb-01.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">
                                Dr. Ruby Perrin
                              </span>{" "}
                              Schedule{" "}
                              <span className="noti-title">
                                her appointment
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                4 mins ago
                              </span>
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
                              src="assets/img/patients/patient1.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">Charlene Reed</span>{" "}
                              has booked her appointment to{" "}
                              <span className="noti-title">
                                Dr. Ruby Perrin
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                6 mins ago
                              </span>
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
                              src="assets/img/patients/patient2.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">Travis Trimble</span>{" "}
                              sent a amount of $210 for his{" "}
                              <span className="noti-title">appointment</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                8 mins ago
                              </span>
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
                              src="assets/img/patients/patient3.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">Carl Kelly</span>{" "}
                              send a message{" "}
                              <span className="noti-title"> to his doctor</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                12 mins ago
                              </span>
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
                    src="assets/img/profiles/avatar-01.jpg"
                    width="31"
                    alt="Ryan Taylor"
                  />
                </span>
              </a>
              <div className="dropdown-menu">
                <div className="user-header">
                  <div className="avatar avatar-sm">
                    <img
                      src="assets/img/profiles/avatar-01.jpg"
                      alt="User Image"
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="user-text">
                    <h6>Ryan Taylor</h6>
                    <p className="text-muted mb-0">Administrator</p>
                  </div>
                </div>
                <a className="dropdown-item" href="profile.html">
                  My Profile
                </a>
                <a className="dropdown-item" href="settings.html">
                  Settings
                </a>
                <a className="dropdown-item" href="login.html">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li>
                  <a href="index.html">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </a>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fe fe-document"></i> <span> Hospital</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={{ display: "none" }}>
                    <li>
                      <a href="invoice-report.html">Division</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Basic Inputs</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Basic Inputs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Basic Inputs</h4>
                  </div>
                  <div className="card-body">
                    <form action="#">
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Text Input
                        </label>
                        <div className="col-md-10">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Password
                        </label>
                        <div className="col-md-10">
                          <input type="password" className="form-control" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Disabled Input
                        </label>
                        <div className="col-md-10">
                          <input
                            type="text"
                            className="form-control"
                            disabled="disabled"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Readonly Input
                        </label>
                        <div className="col-md-10">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Placeholder
                        </label>
                        <div className="col-md-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Placeholder"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          File Input
                        </label>
                        <div className="col-md-10">
                          <input className="form-control" type="file" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Default Select
                        </label>
                        <div className="col-md-10">
                          <select className="form-control">
                            <option>-- Select --</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                            <option>Option 4</option>
                            <option>Option 5</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">Radio</label>
                        <div className="col-md-10">
                          <div className="radio">
                            <label>
                              <input type="radio" name="radio" /> Option 1
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio" name="radio" /> Option 2
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio" name="radio" /> Option 3
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Checkbox
                        </label>
                        <div className="col-md-10">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" name="checkbox" /> Option 1
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" name="checkbox" /> Option 2
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" name="checkbox" /> Option 3
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Textarea
                        </label>
                        <div className="col-md-10">
                          <textarea
                            rows="5"
                            cols="5"
                            className="form-control"
                            placeholder="Enter text here"
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-group mb-0 row">
                        <label className="col-form-label col-md-2">
                          Input Addons
                        </label>
                        <div className="col-md-10">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">$</span>
                            </div>
                            <input className="form-control" type="text" />
                            <div className="input-group-append">
                              <button className="btn btn-primary" type="button">
                                Button
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Input Sizes</h4>
                  </div>
                  <div className="card-body">
                    <form action="#">
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Large Input
                        </label>
                        <div className="col-md-10">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder=".form-control-lg"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Default Input
                        </label>
                        <div className="col-md-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=".form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-0 row">
                        <label className="col-form-label col-md-2">
                          Small Input
                        </label>
                        <div className="col-md-10">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder=".form-control-sm"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Division