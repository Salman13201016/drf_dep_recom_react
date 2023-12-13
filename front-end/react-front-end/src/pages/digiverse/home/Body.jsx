import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'


const BodyComp = ({ setonLoadView }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const divs = document.querySelectorAll(".slider_box");
    const totalDivs = divs.length;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalDivs);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run the effect only once on mount

    useEffect(() => {
      const divs = document.querySelectorAll(".slider_box");

      // Remove "current" class from all divs
      divs.forEach((div) => div.classList.remove("current"));

      // Add "current" class to the div at the current index
      divs[currentIndex].classList.add("current");

      // After 4 seconds, remove "current" class from the current div
      const timeoutId = setTimeout(() => {
        divs[currentIndex].classList.remove("current");
      }, 4000);

      return () => {
        clearTimeout(timeoutId);
      };
    }, [currentIndex]);

  return (
    <section className="body">
      <div className="container">
        <div className="body_main">
          <div className="header_logo" onClick={() => setonLoadView(true)}>
            <a className="home_page_logo">
              <img
                src="../../../../src/assets/digiverseAssets/img/logo/DigiVerse-Logo.png"
                alt="Logo"
              />
            </a>
          </div>
          <div className="content">
            <div className="slider_main">
              <div className="slider_box current">
                <h2 className="slider_title">Help me pic</h2>
                <p className="slider_text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  rem cumque eligendi sit ea, deleniti expedita corrupti autem
                  exercitationem magni?
                </p>
              </div>
              <div className="slider_box">
                <h2 className="slider_title">Give me ideas</h2>
                <p className="slider_text">
                  consectetur adipisicing elit. Quis rem cumque eligendi sit ea,
                  deleniti expedita corrupti autem exercitationem magni?
                </p>
              </div>
              <div className="slider_box">
                <h2 className="slider_title">Help me pic</h2>
                <p className="slider_text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  rem cumque eligendi sit ea, deleniti expedita corrupti autem
                  exercitationem magni?
                </p>
              </div>
              <div className="slider_box">
                <h2 className="slider_title">Write text for service</h2>
                <p className="slider_text">
                  dolor sit amet consectetur adipisicing elit. Quis rem cumque
                  eligendi sit ea, deleniti expedita corrupti autem
                  exercitationem magni?
                </p>
              </div>
            </div>
          </div>
          <div className="btns">
            <Link to={"/digiverse/login"}>Log in</Link>
            <Link to={"/digiverse/signup"}>Sign up</Link>
          </div>
          <div className="footer_main home_page_footer">
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
      </div>
    </section>
  );
};

BodyComp.propTypes = {
  setonLoadView: PropTypes.func,
};

export default BodyComp;
