
import { Link } from "react-router-dom";
import { validateForm } from "../../../utils/utils";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { getGoogleUser } from "../../../api/google";
import apiService from "../../../api";
import {useNavigate} from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";


export const DigiverseSignUp = () => {
  const [user, setUser] = useState(null);
  const [message, setmessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const iconClass = passwordVisibility
      ? "fa-solid fa-eye"
      : "fa-solid fa-eye-slash";
    const inputType = passwordVisibility ? "text" : "password";
  const navigate = useNavigate();
  const showBackendMessage = () =>{
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      // identity: "",
      dob : ""
    },
    validate: validateForm,

    onSubmit: async (values) => {
      setisLoading(true);
      const userInfo = {
        fname: values.name,
        email: values.email,
        mobile: values.phone,
        password: values.password,
        conf_password: values.confirmPassword,
        date_of_birth: values.dob,
      };
      const result = await apiService.signUpPostData(
        "http://127.0.0.1:8000/auth_user/signup/",
        userInfo
      );
      if (result.status == 201) {
        setisLoading(false);
        navigate("/digiverse/welcome");
      } else {
        setisLoading(false);
        setmessage(result);
        showBackendMessage();
        console.log(result);
      }
    },
  });



  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      const profile = getGoogleUser(user.access_token);
      profile.then((res) => {
        const userInfo = {
          Uid: res.id,
          name: res.name,
          email: res.email,
        };
        console.log(userInfo);
      });
    }
  }, [user]);

    const passVisibilityToggle = () => {
      setPasswordVisibility(!passwordVisibility);
    };

  return (
    <div className="digiverseBody">
      <div className="signup_main_div">
        <div className="bg_dark_signup"></div>
        {/* ------- header section ------------ */}
        <section>
          <div className="header_main">
            <div className="header_logo">
              <Link to={"/digiverse"}>
                <img
                  src="../../../../src/assets/digiverseAssets/img/logo/White-DigiVerse-Logo.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </section>

        {/* ----- signup  section -------- */}
        <section className="signup">
          <div className="container">
            <div className="login_main signup">
              <div className="login_inner">
                <h2 className="auth_title">Create account</h2>
                <form action="#" onSubmit={formik.handleSubmit}>
                  {/* -----name input--------- */}
                  {formik.touched.name && formik.errors.name ? (
                    <small className="warningMessage">
                      {formik.errors.name}
                    </small>
                  ) : null}
                  <div className="form_inner_div">
                    <label htmlFor="text">
                      <i className="fa-solid fa-user"></i>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {!formik.values.name && (
                      <span className="require_mark">*</span>
                    )}
                  </div>

                  {/* -----email input--------- */}
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
                    {!formik.values.email && (
                      <span className="require_mark">*</span>
                    )}
                  </div>

                  {/* -----password input--------- */}
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
                      type={inputType}
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <button className="bg-transparent border-0" type="button" onClick={passVisibilityToggle} >
                      <i
                        id="view_pass"
                        className={iconClass}
                      ></i>
                    </button>
                    {!formik.values.password && (
                      <span className="require_mark">*</span>
                    )}
                  </div>

                  {/* -----confirm password input--------- */}
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <small className="warningMessage">
                      {formik.errors.confirmPassword}
                    </small>
                  ) : null}
                  <div className="form_inner_div">
                    <label htmlFor="conPass">
                      <i className="fa-solid fa-lock"></i>
                    </label>
                    <input
                      type={inputType}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Enter Confirm Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    <button className="bg-transparent border-0" type="button" onClick={passVisibilityToggle} >
                      <i
                        id="view_pass"
                        className={iconClass}
                      ></i>
                    </button>
                    {!formik.values.confirmPassword && (
                      <span className="require_mark">*</span>
                    )}
                  </div>

                  {/* -----phone number input--------- */}
                  {formik.touched.phone && formik.errors.phone ? (
                    <small className="warningMessage">
                      {formik.errors.phone}
                    </small>
                  ) : null}
                  <div className="form_inner_div">
                    <label htmlFor="mobile">
                      <i className="fa-solid fa-mobile fa-fw"></i>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Enter Mobile Number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {!formik.values.phone && (
                      <span className="require_mark">*</span>
                    )}
                  </div>

                  {/* -----identity input--------- */}
                  {/* {formik.touched.identity && formik.errors.identity ? (
                    <small className="warningMessage">
                      {formik.errors.identity}
                    </small>
                  ) : null}
                  <div className="form_inner_div">
                    <label htmlFor="nid">
                      <i className="fa-solid fa-id-badge"></i>
                    </label>
                    <input
                      type="text"
                      name="identity"
                      id="identity"
                      placeholder=" Enter NID/ Passport/ Birth Certificate Number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.identity}
                    />
                    {!formik.values.identity && (
                      <span className="require_mark">*</span>
                    )}
                  </div> */}

                  {/* -----Date of birth input--------- */}
                  {formik.touched.dob && formik.errors.dob ? (
                    <small className="warningMessage">
                      {formik.errors.dob}
                    </small>
                  ) : null}
                  <div className="form_inner_div">
                    <label htmlFor="dob">
                      <i className="fa-solid fa-id-badge"></i>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      placeholder=" Enter Date of Birth"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dob}
                    />
                    {!formik.values.dob && (
                      <span className="require_mark">*</span>
                    )}
                  </div>

                  {visible && <p style={{ color: "white" }}>{message}</p>}

                  <BeatLoader color="#ffffff" loading={isLoading} />

                  <div className="signup_btn_div">
                    <button type="submit" className="auth_btn">
                      Sign up
                    </button>
                  </div>
                  <div className="or">
                    <div className="ordiv"></div>
                    <p className="or_text">OR</p>
                    <div className="ordiv"></div>
                  </div>
                </form>
                <button
                  type="button"
                  className="google_btn"
                  onClick={() => login()}
                >
                  <a href="#">
                    <i className="fa-brands fa-google fa-fw"></i>
                  </a>
                </button>
                <div className="auth_btn_back">
                  <Link
                    to={"/digiverse/login"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    If Registered
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------footer section------------ */}
        <section className="footer signup_footer">
          <div className="container">
            <div className="footer_main">
              <div className="copyrights">
                <p className="copy_content">
                  All Rights Reserved By{" "}
                  <Link to={"/digiverse"}>Digiverse</Link>
                </p>
              </div>
              <div className="login_privacy">
                <a href="terms.html">Terms of use</a>
                <a href="privacy.html">Privacy policy</a>
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
    </div>
  );
};


