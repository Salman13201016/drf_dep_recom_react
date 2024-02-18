const DigiverseAbout = () => {
  return (
    <div className="digiverseBody">
      <div className="cursor">
        <img src="./assets/img/logo/Mouse1.png" alt="" />
      </div>

      <div className="bgdurkabout"></div>

      {/* -------------------header section-------------- */}
      <div className="header_main">
        <div className="header_logo login_logo">
          <a href="index.html">
            <img
              className=""
              src="../../../../src/assets/digiverseAssets/img/logo/White-DigiVerse-Logo.png"
              alt=""
            />
          </a>
        </div>
      </div>

      {/* ----------------about body section--------------------- */}
      <section className="about_section">
        <div className="about_main">
          <div className="about_inner">
            {/* <!-- Single section Start --> */}
            {/* <!-- About  --> */}
            <div className="about_single_div left_align">
              {/* <img className="single_bg_img tech_img" src="./assets/img/about/800-X-1400-1.jpg" alt=""/> */}
              <img
                className="single_bg_img tech_img"
                src="../../../../src/assets/digiverseAssets/img/about/800-X-1400-1.jpg"
                alt=""
              />
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">ABOUT</h2>
                <p className="about_paragraph halfContent" id="text_id">
                  Founded in 2022, Digiverse Healthcare Limited began its
                  journey, prioritizing comprehensive AI-drivenhealthcare
                  services and robust data security.
                </p>
                <p className="about_paragraph fullContent d-none">
                  Founded in 2022, Digiverse Healthcare Limited began its
                  journey, prioritizing comprehensive AI-drivenhealthcare
                  services and robust data security. We stand at the vanguard of
                  AI-based healthcare, redefiningthe industry landscape with an
                  unwavering focus on data security. Our pioneering platform
                  deliverscomprehensive services, facilitating seamless online
                  appointments and serving as a singular destinationfor a wide
                  spectrum of healthcare requirements.
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
              <div className="about_single_img"></div>
            </div>

            {/* <!-- Ai In Health --> */}
            <div className="about_single_div left_align">
              {/* <img
                className="single_bg_img tech_img"
                src="./assets/img/about/525-X-1024-2.jpg"
                alt=""
              /> */}
              <img
                className="single_bg_img tech_img"
                src="../../../../src/assets/digiverseAssets/img/about/525-X-1024-2.jpg"
                alt=""
              />
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">AI IN HEALTH SECTOR</h2>
                <ul className="aboutcontentList halfContent">
                  <li>
                    <p className="about_paragraph">
                      Enhanced Diagnosis: AI aids in accurate and faster
                      diagnoses, potentially saving lives.
                    </p>
                  </li>
                  <li>
                    <p className="about_paragraph">
                      Personalized Treatment: Tailored treatments based on AI
                      analysis improve patient outcomes.
                    </p>
                  </li>
                </ul>
                <p className="about_paragraph fullContent d-none width_0">
                  <ul className="aboutcontentList fullContent d-none">
                    <li>
                      <p className="about_paragraph">
                        Enhanced Diagnosis: AI aids in accurate and faster
                        diagnoses, potentially saving lives.
                      </p>
                    </li>
                    <li>
                      <p className="about_paragraph">
                        Personalized Treatment: Tailored treatments based on AI
                        analysis improve patient outcomes.
                      </p>
                    </li>
                    <li>
                      <p className="about_paragraph">
                        Efficiency & Accessibility: Streamlined operations and
                        remote healthcare services benefit communities,
                        especially underserved areas.
                      </p>
                    </li>
                  </ul>
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
              <div className="about_single_img"></div>
            </div>

            {/* <!-- 4th Industrial --> */}
            <div className="about_single_div right_align">
              <img
                className="single_bg_img tech_img"
                src="./assets/img/about/525-X-1024-3.jpg"
                alt=""
              />
              <div className="about_single_img"></div>
              <div className="about_single_text" id="test_id">
                <h2 className="about_title title_half">
                  4TH INDUSTRIAL REVOLUTION(IR)
                </h2>
                <h2 className="about_title title_full d-none">
                  4TH INDUSTRIAL REVOLUTION(IR) SMART BANGLADESH: GOVERNMENT
                  INITIATIVES AND DIGIVERSE
                </h2>
                <p className="about_paragraph halfContent" id="text_id">
                  <ul className="aboutcontentList halfContent">
                    <li>
                      <p className="about_paragraph">
                        Embracing the 4th Industrial Revolution (4th IR)
                        involves integrating health tech.
                      </p>
                    </li>
                  </ul>
                </p>
                <ul className="aboutcontentList fullContent d-none">
                  <li>
                    <p className="about_paragraph">
                      Embracing the 4th Industrial Revolution (4th IR) involves
                      integrating health tech.
                    </p>
                  </li>
                  <li>
                    <p className="about_paragraph">
                      Digiverse secured NOC and ethical clearance from BMRC,
                      Ministry of Health, furthering its health tech-based
                      initiatives.
                    </p>
                  </li>
                </ul>
                <a className="link_ath_bmrc" href="https://bmrcbd.org/">
                  BMRC
                </a>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
            </div>

            {/* <!-- Our Values --> */}
            <div className="about_single_div right_align">
              {/* <!-- <img className="single_bg_img" src="" alt=""/> --> */}
              <div className="about_single_img"></div>
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">OUR VALUES</h2>
                <p className="about_paragraph halfContent" id="text_id">
                  Our foundation is built upon a steadfast commitment to our
                  core values with Technology | Innovation | Privacy | Patient
                  Satisfaction | Win Together.
                </p>
                <p className="about_paragraph fullContent d-none">
                  Our foundation is built upon a steadfast commitment to our
                  core values with Technology | Innovation | Privacy | Patient
                  Satisfaction | Win Together.
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
            </div>

            {/* <!-- Technology --> */}
            <div className="about_single_div left_align">
              <img
                className="single_bg_img tech_img"
                src="./assets/img/about/technology.jpg"
                alt=""
              />
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">TECHNOLOGY</h2>
                <p className="about_paragraph halfContent" id="text_id">
                  In our commitment to revolutionize healthcare, we are at the
                  forefront of innovation, leveraging cutting-edge AI technology
                  to create a seamless and efficient patient experience. By
                  pioneering the
                </p>
                <p className="about_paragraph fullContent d-none">
                  In our commitment to revolutionize healthcare, we are at the
                  forefront of innovation, leveraging cutting-edge AI technology
                  to create a seamless and efficient patient experience. By
                  pioneering the integration of artificial intelligence into
                  healthcare systems, we aim to enhance diagnostic accuracy,
                  streamline administrative processes, and ultimately improve
                  overall patient care. Our groundbreaking solutions are
                  designed to empower healthcare professionals with advanced
                  tools that not only optimize workflow but also contribute to
                  better treatment outcomes. Through continuous research and
                  development, we strive to redefine the standards of healthcare
                  delivery, ensuring that patients receive the highest
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
              <div className="about_single_img"></div>
            </div>

            {/* <!-- Innovation --> */}
            <div className="about_single_div left_align">
              <img
                className="single_bg_img tech_img"
                src="./assets/img/about/innovat.png"
                alt=""
              />
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">INNOVATION</h2>
                <p className="about_paragraph halfContent">
                  At the forefront of healthcare innovation, we stand as a
                  beacon, illuminating the path to a new era in patient care.
                  Our relentless pursuit of excellence drives us to redefine the
                  standards of healthcare,
                </p>
                <p className="about_paragraph fullContent d-none">
                  At the forefront of healthcare innovation, we stand as a
                  beacon, illuminating the path to a new era in patient care.
                  Our relentless pursuit of excellence drives us to redefine the
                  standards of healthcare, harnessing the power of
                  groundbreaking technologies. By seamlessly integrating
                  cutting-edge advancements, we aim not only to enhance medical
                  practices but also to elevate the overall patient experience.
                  Through the convergence of innovation and compassion, we
                  strive to create a healthcare paradigm that prioritizes
                  precision, efficiency, and, above all, the well-being of those
                  entrusted to our care. This commitment positions us as
                  pioneers, charting a course toward a future where healthcare
                  is not just a service but a personalized,
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
              <div className="about_single_img"></div>
            </div>

            {/* <!-- PRIVACY --> */}
            <div className="about_single_div right_align">
              <img
                className="single_bg_img"
                src="./assets/img/about/privacy2.webp"
                alt=""
              />
              <div className="about_single_img"></div>
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">PRIVACY</h2>
                <p className="about_paragraph halfContent" id="text_id">
                  Dedicated to safeguarding the confidentiality of patient
                  information, our healthcare system is unwavering in its
                  commitment to top-tier privacy. We prioritize data security
                  with a comprehensive approach,
                </p>
                <p className="about_paragraph fullContent d-none">
                  Dedicated to safeguarding the confidentiality of patient
                  information, our healthcare system is unwavering in its
                  commitment to top-tier privacy. We prioritize data security
                  with a comprehensive approach, implementing and constantly
                  updating robust measures to fortify the integrity of sensitive
                  information. Through cutting-edge encryption technologies,
                  access controls, and stringent authentication protocols, we
                  establish a secure foundation that instills trust among
                  patients, healthcare professionals, and stakeholders alike.
                  Our proactive stance on privacy not only meets but exceeds
                  industry standards, ensuring that individuals entrust their
                  health data to a system built on the highest standards of
                  confidentiality.
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
            </div>

            {/* <!-- Patient Satisfation --> */}
            <div className="about_single_div right_align">
              <img
                className="single_bg_img"
                src="./assets/img/about/patientsatisfaction.jpg"
                alt=""
              />
              <div className="about_single_img"></div>
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">PATIENT SATISFACTION</h2>
                <p className="about_paragraph halfContent" id="text_id">
                  Continuously raising the bar, we consistently excel in
                  surpassing patient expectations by delivering a healthcare
                  experience that is not only seamless but also profoundly
                  personalized.
                </p>
                <p className="about_paragraph fullContent d-none">
                  Continuously raising the bar, we consistently excel in
                  surpassing patient expectations by delivering a healthcare
                  experience that is not only seamless but also profoundly
                  personalized. Our commitment to excellence extends beyond
                  conventional norms, as we strive to anticipate and meet the
                  unique needs of each individual under our care. Through a
                  meticulous blend of cutting-edge technology and empathetic
                  human touch, we create a healthcare journey that resonates
                  with the diverse preferences and circumstances of our
                  patients. By proactively embracing innovation, we pave the way
                  for a healthcare landscape where precision meets compassion.
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
            </div>

            {/* <!-- WIN TOGETHER --> */}
            <div className="about_single_div left_align">
              <img
                className="single_bg_img tech_img"
                src="./assets/img/about/wintogether.jpg"
                alt=""
              />
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">WIN TOGETHER</h2>
                <p className="about_paragraph halfContent">
                  Firmly rooted in the spirit of collaboration and synergy, our
                  approach is centered on uniting diverse stakeholders in a
                  collective pursuit of success. By fostering a culture of
                  teamwork, we recognize that
                </p>
                <p className="about_paragraph fullContent d-none">
                  Firmly rooted in the spirit of collaboration and synergy, our
                  approach is centered on uniting diverse stakeholders in a
                  collective pursuit of success. By fostering a culture of
                  teamwork, we recognize that our victories are shared, and
                  together, we strive for optimal healthcare outcomes that
                  benefit all. In our collaborative ecosystem, the synergy of
                  talents, ideas, and expertise converges to form a powerful
                  force dedicated to advancing the frontiers of healthcare. We
                  understand that the complex challenges of the healthcare
                  landscape demand a united effort, where each individual
                  contribution, whether from healthcare professionals,
                  technology experts, or administrative staff, plays a pivotal
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
              <div className="about_single_img"></div>
            </div>

            {/* <!-- OUR SERVICES --> */}
            <div className="about_single_div left_align">
              {/* <!-- <img className="single_bg_img tech_img" src="./assets/img/about/innovat.png" alt=""/> --> */}
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">OUR SERVICES</h2>
                <p className="about_paragraph halfContent">
                  Digiverse has commenced telemedicine services, laying the
                  foundation for more expansive healthcare offerings. We’re
                  planning to include expanding telemedicine services and
                  implementing advanced healthcare solutions.
                </p>
                <p className="about_paragraph fullContent d-none">
                  Digiverse has commenced telemedicine services, laying the
                  foundation for more expansive healthcare offerings. We’re
                  planning to include expanding telemedicine services and
                  implementing advanced healthcare solutions.
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
              <div className="about_single_img"></div>
            </div>

            {/* <!-- AI Health Assistant --> */}
            <div className="about_single_div right_align">
              <img
                className="single_bg_img"
                src="./assets/img/about/aihealthassistant.jpeg"
                alt=""
              />
              <div className="about_single_img"></div>
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">AI Health Assistant</h2>
                <p className="about_paragraph halfContent" id="text_id">
                  Our innovative healthcare approach is propelled by an
                  AI-driven systemthat goes beyond conventional practices,
                  leveraging advanced technologies to provide comprehensive
                  symptom analysis
                </p>
                <p className="about_paragraph fullContent d-none">
                  Our innovative healthcare approach is propelled by an
                  AI-driven systemthat goes beyond conventional practices,
                  leveraging advanced technologies to provide comprehensive
                  symptom analysis and medical advice. This intelligent system,
                  fortified by artificial intelligence, serves as a cutting-edge
                  diagnostic tool, assisting healthcare professionals in
                  accurately understanding and interpreting a wide array of
                  symptoms presented by patients. Machine learning, a
                  cornerstone of our methodology, takes personalized healthcare
                  to new heights. By continually adapting and learning from vast
                  datasets, our system tailors its
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
            </div>

            {/* <!-- Diagnosis --> */}
            <div className="about_single_div right_align">
              <img
                className="single_bg_img"
                src="./assets/img/about/2.webp"
                alt=""
              />
              <div className="about_single_img"></div>
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">Diagnosis</h2>
                <p className="about_paragraph halfContent" id="text_id">
                  Embracing the frontier of healthcare innovation, we have
                  introduced pioneering solutions that harness the power of AI
                  algorithms and image analysis for remote diagnostics. These
                  cutting-edge
                </p>
                <p className="about_paragraph fullContent d-none">
                  Embracing the frontier of healthcare innovation, we have
                  introduced pioneering solutions that harness the power of AI
                  algorithms and image analysis for remote diagnostics. These
                  cutting-edge tools redefine the traditional boundaries of
                  healthcare, allowing for swift and accurate assessments of
                  medical conditions from a distance. By integrating AI into
                  diagnostic processes, we enhance the efficiency and
                  reliability of remote medical evaluations, enabling timely
                  interventions and informed decision- making. Our commitment to
                  remote healthcare extends beyond geographical constraints,
                  ensuring accessibility and convenience for patients while
                  maintaining
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
            </div>

            {/* <!-- Doctor Appointments --> */}
            <div className="about_single_div left_align">
              <img
                className="single_bg_img tech_img"
                src="./assets/img/about/doctorappointment.jpg"
                alt=""
              />
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">Doctor Appointments</h2>
                <p className="about_paragraph halfContent">
                  Revolutionizing the healthcare experience, our virtual
                  appointment platform transcends geographical boundaries,
                  offering a sophisticated ecosystem for seamless video
                  consultations.
                </p>
                <p className="about_paragraph fullContent d-none">
                  Revolutionizing the healthcare experience, our virtual
                  appointment platform transcends geographical boundaries,
                  offering a sophisticated ecosystem for seamless video
                  consultations. Through this innovative platform, patients and
                  healthcare providers connect in a virtual space, facilitating
                  timely, efficient, and personalized healthcare interactions
                  from the comfort of one&apos;s own environment. This not only
                  enhances accessibility for individuals in diverse locations
                  but also minimizes the need for physical visits, promoting a
                  patient-centric approach to care. In addition to video
                  consultations, our platform ensures secure communication
                  through advanced messaging
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
              <div className="about_single_img"></div>
            </div>

            {/* <!-- Health Insurance --> */}
            <div className="about_single_div left_align">
              <img
                className="single_bg_img tech_img"
                src="./assets/img/about/4.webp"
                alt=""
              />
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">Health Insurance</h2>
                <p className="about_paragraph halfContent">
                  Revolutionizing the intersection of healthcare and insurance,
                  we have pioneered a forward-thinking approach by seamlessly
                  integrating telemedicine coverage into insurance plans.
                </p>
                <p className="about_paragraph fullContent d-none">
                  Revolutionizing the intersection of healthcare and insurance,
                  we have pioneered a forward-thinking approach by seamlessly
                  integrating telemedicine coverage into insurance plans. This
                  strategic integration extends beyond traditional healthcare
                  models, ensuring that individuals covered by our insurance
                  plans have convenient access to telehealth services. This not
                  only enhances the overall value proposition of insurance but
                  also aligns with our commitment to promoting proactive and
                  accessible healthcare. In addition to telemedicine coverage,
                  we offer innovative services that go beyond the conventional
                  boundaries of healthcare insurance. Our healthcare insurers
                  provide tailored telehealth packages designed
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
              <div className="about_single_img"></div>
            </div>

            {/* <!-- Telemedicine --> */}
            <div className="about_single_div right_align">
              <img
                className="single_bg_img"
                src="./assets/img/about/telemedicine.jpg"
                alt=""
              />
              <div className="about_single_img"></div>
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">Telemedicine</h2>
                <p className="about_paragraph halfContent" id="text_id">
                  At the forefront of healthcare innovation, we are driving a
                  transformative shift by incorporating Electronic Health
                  Records (EHRs) into our systems, ensuring seamless access to
                  comprehensive patient
                </p>
                <p className="about_paragraph fullContent d-none">
                  At the forefront of healthcare innovation, we are driving a
                  transformative shift by incorporating Electronic Health
                  Records (EHRs) into our systems, ensuring seamless access to
                  comprehensive patient information. This strategic integration
                  of EHRs enhances the continuity of care by providing
                  healthcare professionals with a holistic view of a
                  patient&apos;s medical history, facilitating more informed and
                  personalized decision-making. Our commitment to a
                  patient-centric approach extends to the optimization of
                  connectivity and user experience. Through enhanced
                  connectivity features, patients can securely access their
                  health information, schedule appointments, and communicate
                  with healthcare providers seamlessly.
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
            </div>

            {/* <!-- Medical Accessories --> */}
            <div className="about_single_div right_align">
              <img
                className="single_bg_img"
                src="./assets/img/about/medicalaccessories.png"
                alt=""
              />
              <div className="about_single_img"></div>
              <div className="about_single_text" id="test_id">
                <h2 className="about_title">Medical Accessories</h2>
                <p className="about_paragraph halfContent" id="text_id">
                  At the forefront of healthcare innovation, we go beyond
                  traditional boundaries by offering a spectrum of remote
                  monitoring devices or establishing strategic partnerships with
                  leading technology
                </p>
                <p className="about_paragraph fullContent d-none">
                  At the forefront of healthcare innovation, we go beyond
                  traditional boundaries by offering a spectrum of remote
                  monitoring devices or establishing strategic partnerships with
                  leading technology providers in this domain. By integrating
                  these cutting-edge devices into our healthcare ecosystem, we
                  empower individuals to proactively manage their health from
                  the comfort of their homes. Whether it&apos;s wearable devices
                  tracking vital signs, smart sensors for specific health
                  parameters, or other innovative technologies, our commitment
                  to remote monitoring aims to provide real-time, actionable
                  insights for both patients and healthcare professionals. In
                  parallel, we provide
                </p>
                <button className="seemore">see more..</button>
                <button className="less d-none">less</button>
              </div>
            </div>

            <div className="about_finished">
              <p className="finished_para">
                EXPLORE OUR ADVANCEMENTS AND INITIATIVES |
                <a href="digiverse.com">DIGIVERSE</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------footer section-------------- */}
      <section className="footer privacy_footer">
        <div className="container">
          <div className="footer_main">
            <div className="copyrights">
              <p className="copy_content">
                All Rights Reserved By <a href="#">Digiverse</a>
              </p>
            </div>
            <div className="login_privacy">
              <a href="#">Terms of use</a>
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
  );
};

export default DigiverseAbout;
