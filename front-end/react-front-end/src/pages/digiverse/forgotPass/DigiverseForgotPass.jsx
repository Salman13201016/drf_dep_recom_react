import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { validateEmail } from "../../../utils/utils";
const DigiverseForgotPass = () => {
  const formik = useFormik({
    initialValues : {email:''},
    validate : validateEmail,
    onSubmit : (values)=>{
      console.log(values)
    }
  })
  return (
    <div className="digiverseBody">
      <div className="bg_dark_pryvacy"></div>

      {/* --------------header section--------------- */}
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

      {/* ---------------forgot password section------------- */}
      <section className="gorgot_pass_secton">
        <div className="container">
          <div className="forgot_main">
            <h2 className="forgot_title">
              Enter your email for get the reset link
            </h2>
            <form action="#" onSubmit={formik.handleSubmit}>
              {formik.touched.email && formik.errors.email ? (
                <small className="warningMessage">{formik.errors.email}</small>
              ) : null}
              <input
                className="forgot_input"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <button type="submit" className="forgot_send_btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --------------footer section---------------------- */}
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

export default DigiverseForgotPass;
