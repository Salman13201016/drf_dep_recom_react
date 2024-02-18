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
                Privacy Policy of Digiverse Healthcare Limited.
                <span>26/11/2023</span>
              </p>
              <h2 className="pSubTitle">Introduction</h2>
              <p className="privacy_data_color">
                Digiverse Healthcare Limited {'("we," "us," or "our")'} values the
                privacy of our website visitors and users. This Privacy Policy
                outlines how we collect, use, and protect personal information
                obtained through our website.
              </p>
              <p className="privacy_data_color">
                By using our website, you agree to this Privacy Policy and the
                terms defined in our Terms of Use.
              </p>
              <h2 className="pSubTitle">1. nformation We Collect</h2>
              <p className="privacy_data">
                We gather information to improve and personalize your experience
                on our site:
              </p>
              <p className="privacy_data">Passively-Collected Information:</p>
              <p className="privacy_data">
                We automatically receive and store certain information when you
                interact with our site, such as IP addresses and browser
                details, collected through standard server logs, cookies, and
                clear GIFs (Web beacons). This information is used for analysis
                and site enhancement and generally does not identify users
                personally.
              </p>
              <p className="privacy_data">
                We utilize cookies to retrieve information when your web browser
                accesses our site. You can adjust your browser settings to
                manage cookies.
              </p>
              <p className="privacy_data">
                Personally Identifiable Information (PII):
              </p>
              <p className="privacy_data">
                Certain features require registration, and when you register, we
                may collect PII like your name and email. We do not combine this
                with passively collected information.
              </p>
              <h2 className="pSubTitle">
                2. How We Use Your Personally Identifiable Information
              </h2>
              <ul>
                <li>
                  Customer Service: We use the information provided for customer
                  support purposes.
                </li>
                <li>
                  Email Communications: Periodically, we may send emails about
                  products or services you might find interesting. You can
                  opt-out by contacting us.
                </li>
                <li>
                  Enforcement of Terms and Law: Information collected may be
                  used to enforce our Terms of Use and applicable laws.
                </li>
              </ul>
              <h2 className="pSubTitle">3. How We Share Your Information</h2>
              <ul>
                <li>
                  Except as stated, we do not disclose your PII to third parties
                  without consent, except under specific circumstances outlined
                  in this policy.
                </li>
              </ul>
              <h2 className="pSubTitle">4. Security</h2>
              <ul>
                <li>
                  While we take measures to protect your information, we cannot
                  guarantee absolute security. We employ industry-standard
                  safeguards to prevent unauthorized access.
                </li>
              </ul>
              <h2 className="pSubTitle">5. Minors</h2>
              <ul>
                <li>
                  Our site is intended for adults, and we do not knowingly
                  collect information from individuals under 13 years of age.
                </li>
              </ul>
              <h2 className="pSubTitle">6. International Users</h2>
              <ul>
                <li>
                  Our site is designed for use byPeople&apos;s Republic of
                  Bangladesh, and data provided on our site is governed by
                  Bangladesh privacy laws.
                </li>
              </ul>
              <h2 className="pSubTitle">7. Updates to This Policy</h2>
              <ul>
                <li>
                  We may update this policy periodically. Your continued use of
                  our site after changes will be subject to the revised policy.
                </li>
                <li>
                  If you have questions about this policy, contact us at:
                  help@digiverse.com.bd
                </li>
                <li>
                  Please ensure to customize this Privacy Policy according to
                  your specific data collection practices and legal
                  requirements.
                </li>
              </ul>
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
                All Rights Reserved By <Link to={"digiverse"}>Digiverse</Link>
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
