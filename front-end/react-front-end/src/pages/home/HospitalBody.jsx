import PropTypes from "prop-types";

import DistrictInput from "./Input/DistrictInput";
import DivisionInput from "./Input/DivisionInput";
import StationInput from "./Input/StationInput";
import HospitalCategoryInput from "./Input/HospitalCategoryInput";
import HospitalAppInput from "./Input/HospitalAppInput";
import HospitalMap from "./Input/HospitalMapInput";
import DepartmentInput from "./Input/DepartmentInput";
import DepartmentDetails from "./Input/DepartmentDetails";
import DiseaseInput from "./Input/DiseaseInput";
import SymtomsInput from "./Input/SymtomsInput";
import DigiverseMain from "../digiverse";


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
    renderComponent = <HospitalMap />;
  } else if (componentShow == "department") {
    renderComponent = <DepartmentInput />;
  } else if (componentShow == "departmentDetails") {
    renderComponent = <DepartmentDetails />;
  } else if (componentShow == "disease") {
    renderComponent = <DiseaseInput />;
  } else if (componentShow == "symtoms") {
    renderComponent = <SymtomsInput />;
  } else if (componentShow == "digiverseBody") {
    renderComponent = <DigiverseMain />
  }

    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <h3 className="page-title">Insert Data Below</h3>
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
