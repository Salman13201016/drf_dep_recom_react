import { Link } from "react-router-dom";

const DigiversePrivacy = () => {
  return (
    <div className="digiverseBody">
      <div className="bg_dark_pryvacy"></div>
      {/* <!--------- header section ----------> */}
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

      {/* <!--------- body section ----------> */}
      <section className="login privacy_body">
        <div className="container">
          <div className="privacy_content">
            <h1 className="privacy_title">Privacy policy</h1>
            <div className="privacy_top">
              <p className="privacy_data_bold">
                This Terms of Service was last updated on{" "}
                <span>26/11/2023</span>
              </p>
              <h2 className="pSubTitle">1. Short summery</h2>
              <p className="privacy_data_color">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
                earum unde rem, exercitationem fugit impedit corporis illum,
                voluptatum, ipsa corrupti cupiditate assumenda aspernatur
                molestias adipisci cum iusto nisi? Culpa, possimus delectus
                accusantium, rem suscipit impedit rerum minima ea nobis nihil
                sed adipisci ducimus omnis nulla odio quae consectetur, ipsam
                maiores! Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Inventore officiis architecto molestiae ab possimus enim
                illo? Dolore mollitia nemo omnis? Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Doloribus tempora ipsam aperiam
                rem temporibus dolorum esse odio veritatis quia voluptatum, sint
                nulla aliquid, beatae, totam quam dolores ipsum. Error, aut.
              </p>
              <h2 className="pSubTitle">2. Data You Provide to Us</h2>
              <p className="privacy_data">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus tempora ipsam aperiam rem temporibus dolorum esse odio
                veritatis quia voluptatum, sint nulla aliquid, beatae, totam
                quam dolores ipsum. Error, aut.
              </p>
              <h2 className="pSubTitle">3. How we use personal information</h2>
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
              <h2 className="pSubTitle">4. Your rights</h2>
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
                All Rights Reserved By <Link to={'digiverse'}>Digiverse</Link>
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

export default DigiversePrivacy;
