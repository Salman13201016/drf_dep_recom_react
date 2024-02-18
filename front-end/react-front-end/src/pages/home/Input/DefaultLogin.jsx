import { Link } from "react-router-dom";
import { validateForm } from "../../../utils/utils";
import { useFormik } from "formik";

const DefaultLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateForm,
    onSubmit: (values) => {
      console.log(values);
    },
  });


  return (
    <div className="digiverseBody">
      <div className="login-main_body">
        <div className="bg_dark_login"></div>
        <section>
          <div className="header_main">
            <div className="header_logo login_logo">
              <Link to={"/digiverse"}>
                <img
                  className=""
                  src="../../../../src/assets/digiverseAssets/img/logo/White-DigiVerse-Logo.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </section>

        <section className="login">
          <div className="container">
            <div className="login_main">
              <div className="login_inner">
                <h2 className="auth_title">Log in</h2>
                <form action="#" onSubmit={formik.handleSubmit}>
                  {/* --------email input------------ */}
                  {formik.touched.email && formik.errors.email ? (
                    <small className="warningMessage">
                      {formik.errors.email}
                    </small>
                  ) : null}
                  <div className="form_inner_div">
                    <label htmlFor="email">
                      <i className="fa-solid fa-envelope"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>

                  {/* --------password input------------ */}
                  {formik.touched.password && formik.errors.password ? (
                    <small className="warningMessage">
                      {formik.errors.password}
                    </small>
                  ) : null}
                  <div className="form_inner_div">
                    <label htmlFor="pass">
                      <i className="fa-solid fa-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                  <div className="auth_btns">
                    <div className="auth_login_btn">
                      <button type="submit" className="auth_btn">
                        Log in
                      </button>
                    </div>
                    <div className="auth_rember_btn">
                      <Link
                        className="remember"
                        to={"/digiverse/login/forgotpass"}
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <div className="or">
                    <div className="ordiv"></div>
                    <p className="or_text">OR</p>
                    <div className="ordiv"></div>
                  </div>
                </form>
                <button type="button" className="google_btn">
                  <a href="#">
                    <i className="fa-brands fa-google fa-fw"></i>
                  </a>
                </button>
                <div className="auth_btn_back">
                  <Link
                    to={"/digiverse/signup"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="footer">
          <div className="container">
            <div className="footer_main home_page_footer">
              <div className="copyrights footer_single">
                <p className="copy_content">
                  All Rights Reserved By{" "}
                  <Link to={"/digiverse"}>Digiverse</Link>
                </p>
              </div>
              <div className="login_privacy footer_single">
                <Link to={"/digiverse/terms"}>Terms of use</Link>
                <Link to={"/digiverse/privacy"}>Privacy policy</Link>
              </div>
              <div className="login_social footer_single">
                <div className="social">
                  <div className="social_inner">
                    <a href="#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DefaultLogin;
