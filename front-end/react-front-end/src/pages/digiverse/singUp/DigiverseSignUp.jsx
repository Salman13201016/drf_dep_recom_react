import { Link } from "react-router-dom";

export const DigiverseSignUp = () => {
  return (
    <div className="digiverseBody">
      {/* ------- header section ------------ */}
      <section className="header">
        <div className="header_main">
          <div className="header_logo">
            <Link to={"/digiverse"}>
              <img
                src="../../../../src/assets/digiverseAssets/img/logo/DigiVerse-Logo.png"
                alt=""
              />
            </Link>
          </div>
        </div>
      </section>
      {/* ----- body section -------- */}
      <section className="login">
        <div className="container">
          <div className="login_main signup">
            <div className="backToSignup">
              <div className="auth_banner">
                <img
                  src="../../../../src/assets/digiverseAssets/img/authBanner/signupbanner.jpg"
                  alt=""
                />
                <div className="auth_btn_back">
                  <a href="login.html">If Registered</a>
                </div>
              </div>
            </div>
            <div className="login_inner">
              <h2 className="auth_title">Create account</h2>
              <form action="#">
                <div className="form_inner_div">
                  <label htmlFor="text">
                    <i className="fa-solid fa-user"></i>
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    placeholder="Enter Your Name"
                    required
                  />
                </div>
                <div className="form_inner_div">
                  <label htmlFor="email">
                    <i className="fa-solid fa-envelope"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="form_inner_div">
                  <label htmlFor="pass">
                    <i className="fa-solid fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div className="form_inner_div">
                  <label htmlFor="conPass">
                    <i className="fa-solid fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="conPass"
                    id="conPass"
                    placeholder="Enter Confirm Password"
                    required
                  />
                </div>
                <div className="form_inner_div">
                  <label htmlFor="mobile">
                    <i className="fa-solid fa-mobile fa-fw"></i>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter Mobile Number"
                    required
                  />
                </div>
                <div className="form_inner_div">
                  <label htmlFor="nid">
                    <i className="fa-solid fa-id-badge"></i>
                  </label>
                  <input
                    type="text"
                    name="nid"
                    id="nid"
                    placeholder=" Enter NID/ Passport/ Birth Certificate Number"
                    required
                  />
                </div>
                <button type="submit" className="auth_btn">
                  Sign up
                </button>
                <div className="or">
                  <div className="ordiv"></div>
                  <p className="or_text">OR</p>
                  <div className="ordiv"></div>
                </div>
                <button type="submit" className="google_btn">
                  <img
                    src="../../../../src/assets/digiverseAssets/img/logo/google2-removebg-preview.png"
                    alt=""
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ------footer section------------ */}
      <section className="footer">
        <div className="container">
          <div className="footer_main">
            <div className="copyrights">
              <p className="copy_content">
                All Rights Reserved By <a href="index.html">Digiverse</a>
              </p>
            </div>
            <div className="login_privacy">
              <Link to={"/digiverse/terms"}>Terms of use</Link>
              <Link to={"/digiverse/privacy"}>Privacy policy</Link>
            </div>
            <div className="login_social">
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
  );
};
