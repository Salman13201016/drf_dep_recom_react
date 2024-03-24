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
import RoleInput from "./Input/RoleInput";
import RoleUser from "./Input/RoleUser";
import DashBoard from "./DefaultBodySection";
import RolePermissionInput from "./Input/RolePermissionInput";
import MenuPermissionInput from "./Input/MenuPermissionInput";
import OldMenuInput from "./Input/OldMenuInput";
import MenuInput from "./Input/MenuInput";
import NotFound from "../../components/UI/pagination/NotFound";


const HospitalBody = ({ componentShow }) => {
  let renderComponent = <NotFound />
  if (componentShow == "division") {
    renderComponent = <DivisionInput />;
  } else if (componentShow == "district") {
    renderComponent = <DistrictInput />;
  } else if (componentShow == "station") {
    renderComponent = <StationInput />;
  } else if (componentShow == "hospital_category") {
    renderComponent = <HospitalCategoryInput />;
  } else if (componentShow == "hospital_app") {
    renderComponent = <HospitalAppInput />;
  } else if (componentShow == "hospital_map") {
    renderComponent = <HospitalMap />;
  } else if (componentShow == "department") {
    renderComponent = <DepartmentInput />;
  } else if (componentShow == "departmentDetails") {
    renderComponent = <DepartmentDetails />;
  } else if (componentShow == "disease") {
    renderComponent = <DiseaseInput />;
  } else if (componentShow == "symptoms") {
    renderComponent = <SymtomsInput />;
  } else if (componentShow == "digiverseBody") {
    renderComponent = <DigiverseMain />;
  } else if (componentShow == "role") {
    renderComponent = <RoleInput />;
  } else if (componentShow == "role_user") {
    renderComponent = <RoleUser />;
  } else if (componentShow == "dashboard") {
    renderComponent = <DashBoard />;
  } else if (componentShow == "role_permission") {
    renderComponent = <RolePermissionInput />;
  } else if (componentShow == "menu_operation") {
    renderComponent = <OldMenuInput />;
  } else if (componentShow == "menu_permission") {
    renderComponent = <MenuPermissionInput />;
  } else if (componentShow == "menu_input") {
    renderComponent = <MenuInput />;
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
