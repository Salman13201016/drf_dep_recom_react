import PropTypes from "prop-types";
const OnLoadComponent = ({ setonLoadView }) => {
  return (
    <section className="onLoad">
      <div className="onLoad_body">
        <div className="logo">
          <img
            src="../../../../src/assets/digiverseAssets/img/logo/White-DigiVerse-Logo.png"
            alt="Logo"
          />
        </div>
        <div className="icon">
          <div className="dot" onClick={() => setonLoadView(false)}></div>
        </div>
      </div>
    </section>
  );
};

OnLoadComponent.propTypes = {
  setonLoadView: PropTypes.func,
};

export default OnLoadComponent;
