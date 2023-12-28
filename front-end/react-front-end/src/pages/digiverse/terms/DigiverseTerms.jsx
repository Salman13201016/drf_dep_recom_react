import { Link } from "react-router-dom";
function DigiverseTerms() {
  return (
    <div className="digiverseBody">
      <div className="bg_dark_pryvacy"></div>
      {/* <!----------- header section -----------> */}
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

      {/* <!--------- Body section -----------> */}
      <section className="login privacy_body">
        <div className="container">
          <div className="privacy_content">
            <h1 className="privacy_title">Terms of use</h1>
            <div className="privacy_top">
              <p className="privacy_data_bold">Welcome to Digiverse!</p>
              <p className="privacy_data">
                These terms and conditions outline the rules and regulations for
                the use of Digiverse’s Website, located at
                https://digiverse.com.
              </p>
              <p className="privacy_data">
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use Digiverse if you do not agree
                to take all of the terms and conditions stated on this page.
              </p>
              <h2 className="pSubTitle">Academic Rules:</h2>
              <p className="privacy_data">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus tempora ipsam aperiam rem temporibus dolorum esse odio
                veritatis quia voluptatum, sint nulla aliquid, beatae, totam
                quam dolores ipsum. Error, aut.
              </p>
              <h2 className="pSubTitle">Rules for getting Lifetime Support:</h2>
              <ul>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium.
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium.
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat, blanditiis?
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat, blanditiis?
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat, blanditiis?
                </li>
              </ul>
              <h2 className="pSubTitle">
                Special Benefits For Premium Custommer
              </h2>
              <ul>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium.
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium.
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat, blanditiis?
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat, blanditiis?
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat, blanditiis?
                </li>
              </ul>
              <h2 className="pSubTitle">Communication and legal policy:</h2>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti, illum.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti, illum.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti, illum. Lorem ipsum dolor sit amet.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti, illum. Lorem ipsum dolor sit amet.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti,{" "}
                </li>
              </ul>
              <p className="privacy_data">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus tempora ipsam aperiam rem temporibus dolorum esse odio
                veritatis quia voluptatum, sint nulla aliquid, beatae, totam
                quam dolores ipsum. Error, aut.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!----------- Footer section -----------------> */}
      <section className="footer">
        <div className="container">
          <div className="footer_main">
            <div className="copyrights">
              <p className="copy_content">
                All Rights Reserved By <Link to={'/digiverse'}>Digiverse</Link>
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
}

export default DigiverseTerms;
