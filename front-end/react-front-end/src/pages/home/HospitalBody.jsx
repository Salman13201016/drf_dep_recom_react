import PropTypes from "prop-types";

import DistrictInput from "./Input/DistrictInput";
import DivisionInput from "./Input/DivisionInput";
import StationInput from "./Input/StationInput";
import HospitalCategoryInput from "./Input/HospitalCategoryInput";
import HospitalAppInput from "./Input/HospitalAppInput";
import HospitalMap from "./Input/HospitalMapInput";


const HospitalBody = ({ componentShow }) => {
  let renderComponent;
  if (componentShow == "division") {
    renderComponent = <DivisionInput />;
  } else if (componentShow == "district") {
    renderComponent = <DistrictInput />;
  } else if (componentShow == "station") {
    renderComponent = <StationInput />;
  } else if (componentShow == "hospitalCtg") {
    renderComponent = <HospitalCategoryInput />;
  } else if (componentShow == "hospitalApp") {
    renderComponent = <HospitalAppInput />;
  } else if (componentShow == "hospitalmap") {
    renderComponent = <HospitalMap />
  }

    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-lg-12">{renderComponent}</div>
          </div>
        </div>
      </div>
    );
};

HospitalBody.propTypes = {
  componentShow: PropTypes.string,
};

export default HospitalBody;
