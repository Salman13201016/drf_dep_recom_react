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
              <p className="privacy_data_bold">
                Welcome to Digiverse Healthcare Limited!
              </p>
              <h2 className="pSubTitle">1. Introduction</h2>

              <ul>
                <li>
                  These Terms of Use (“Terms” or “Agreement”) govern the use of
                  Digiverse Healthcare Limited&apos;s website located at
                  www.digiverse.com.bd
                </li>
                <li>
                  By accessing or using this Site, you agree to abide by these
                  Terms. Additionally, these Terms incorporate Digiverse&apos;s
                  Privacy Policy, detailing our information handling practices.
                  Your acceptance of these Terms includes consenting to our
                  Privacy Policy.
                </li>
                <h2 className="pSubTitle">1.1 Binding Agreement</h2>
                <li>
                  By accessing or using the Site, you accept these Terms,
                  forming a legally binding agreement between you and Digiverse
                  Healthcare Limited.
                </li>
                <h2 className="pSubTitle">1.2 Modifications</h2>
                <li>
                  Digiverse reserves the right to modify these Terms as our
                  business evolves. Regularly review the Terms and any updates
                  posted on the Site. Your continued use of the Site implies
                  acceptance of any such modifications.
                </li>
                <h2 className="pSubTitle">1.3 Eligibility</h2>
                <li>
                  The Site is intended for use by adults aged 18 and above,
                  legally authorized to form binding contracts with Digiverse
                  Healthcare Limited. The Site&apos;s use is governed by the
                  laws of the People&apos;s Republic of Bangladesh, tailored for
                  residents within its jurisdiction.
                </li>
              </ul>

              <h2 className="pSubTitle">2. Ownership and Use of Content</h2>
              <ul>
                <h2 className="pSubTitle">2.1 Digiverse Content Ownership</h2>
                <li>
                  The Site, including its “look and feel” (e.g., text, graphics,
                  images, logos and button icons), photographs, editorial
                  content, notices, software, computer code and other material
                  (“Content”) are the property of Digiverse or its licensors and
                  are protected under both People’s Republic of Bangladesh and
                  other applicable copyright, trademark and other laws.
                </li>
                <h2 className="pSubTitle">2.2 License Granted</h2>
                <li>
                  Subject to compliance with this Agreement, Digiverse grants a
                  limited, non-exclusive, non-transferable license for personal
                  and non-commercial use of the Site. The Content remains the
                  property of Digiverse Healthcare Limited or its licensors.
                </li>
                <h2 className="pSubTitle">2.3 Intellectual Property</h2>
                <li>
                  Digiverse marks and logos are trademarks of Digiverse.
                  Displaying or using these marks without written permission is
                  prohibited.
                </li>
              </ul>

              <h2 className="pSubTitle">3. Copyright Policy</h2>
              <ul>
                <li>
                  For any copyright concerns, contact our Designated Agent at
                  info@digiverse.com.bd
                </li>
                <li>
                  Misrepresentations in notifications of infringement may incur
                  liability.
                </li>
                <li>Email Address: info@digiverse.com.bd</li>
                <li>Phone: +88 01581-799666</li>
              </ul>

              <h2 className="pSubTitle">4. Feedback and Suggestions</h2>
              <ul>
                <li>
                  We welcome feedback and suggestions regarding our Site,
                  reserving the right to use provided ideas in future
                  modifications or materials.
                </li>
              </ul>
              <h2 className="pSubTitle">
                5. Limitations and Prohibitions on Use
              </h2>
              <ul>
                <li>
                  Usage of the Site must comply with applicable laws and these
                  Terms. Prohibited actions include unauthorized access,
                  framing, or misrepresentation of personal information.
                </li>
              </ul>
              <h2 className="pSubTitle">
                6. Disclaimer of Representations and Warranties
              </h2>
              <ul>
                <li>
                  The Content and Services are provided &quot;as is&quot; and
                  &quot;as available.&quot; We do not guarantee accuracy,
                  completeness, or freedom from viruses.
                </li>
              </ul>
              <h2 className="pSubTitle">7. Limitations on Liability</h2>
              <ul>
                <li>
                  Digiverse shall not be liable for any damages arising from
                  Site use, limited to the extent permitted by law.
                </li>
              </ul>
              <h2 className="pSubTitle">8. Indemnification</h2>
              <ul>
                <li>
                  You agree to indemnify and hold Digiverse harmless from any
                  claims arising out of your breach or use of the Service.
                </li>
              </ul>
              <h2 className="pSubTitle">9. Entire Agreement</h2>
              <ul>
                <li>
                  These Terms constitute the entire agreement between you and
                  Digiverse Healthcare Limited.
                </li>
              </ul>
              <h2 className="pSubTitle">10. Applicable Law and Venue</h2>
              <ul>
                <li>
                  The laws of People&apos;s Republic of Bangladesh, with the
                  exclusion of Bangladesh’s choice-of-laws rules, apply to this
                  Agreement. You agree that any action at law or in equity
                  arising out of or relating to these Terms of Use shall be
                  filed as per Bangladeshi Law. You irrevocably and
                  unconditionally consent and submit to the exclusive
                  jurisdiction of such courts over any suit, action or
                  proceeding arising out of these Terms of Use.
                </li>
              </ul>
              <h2 className="pSubTitle">11. Severability</h2>
              <ul>
                <li>
                  Should any provision of these Terms be deemed unenforceable,
                  it shall not affect the validity of other provisions.
                </li>
              </ul>
              <h2 className="pSubTitle">
                12. Questions and Contact Information
              </h2>
              <ul>
                <li>
                  For inquiries about the Site or Service, please contact us at
                  info@digiverse.com.bd
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
}

export default DigiverseTerms;
