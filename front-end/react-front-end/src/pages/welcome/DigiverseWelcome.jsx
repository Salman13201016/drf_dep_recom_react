import { Link } from "react-router-dom";

const DigiverseWelcome = () => {
  return (
    <div className="digiverseBody">
      <div className="bg_dark_pryvacy"></div>

      {/* ------------header section------------------ */}
      <section>
        <div className="header_main">
          <div className="header_logo login_logo">
            <Link to={"/digiverse"}>
              <img
                className=""
                src="../../../src/assets/digiverseAssets/img/logo/White-DigiVerse-Logo.png"
                alt=""
              />
            </Link>
          </div>
        </div>
      </section>

      {/* <!-- forgot section --> */}

      <section className="gorgot_pass_secton">
        <div className="container">
          <div className="forgot_main welcome_main">
            <div className="welcome_icon">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="welcome_msg">
              Congratulations!
              {/*  <span>Md. Anower Hossan</span> */}
            </h3>
            <h4 className="welcome_success">
              You have verified and registered the account successfully.
            </h4>
            <div className="welcome_btn">
              <button className="wc_send">
                <Link to={"/digiverse/login"}>Log in</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --------footer------------ */}
      <section className="footer forgot_footer">
        <div className="container">
          <div className="footer_main">
            <div className="copyrights">
              <p className="copy_content">
                All Rights Reserved By <Link to={"/digiverse"}>Digiverse</Link>
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

export default DigiverseWelcome;
