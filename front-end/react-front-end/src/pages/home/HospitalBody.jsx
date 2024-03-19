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


const HospitalBody = ({ componentShow }) => {
  let renderComponent = <DashBoard />
  if (componentShow == "division") {
    renderComponent = <DivisionInput />;
  } else if (componentShow == "district") {
    renderComponent = <DistrictInput />;
  } else if (componentShow == "station") {
    renderComponent = <StationInput />;
  } else if (componentShow == "hospitalCategory") {
    renderComponent = <HospitalCategoryInput />;
  } else if (componentShow == "hospitalApp") {
    renderComponent = <HospitalAppInput />;
  } else if (componentShow == "hospitalMap") {
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
  }else if (componentShow == "role") {
    renderComponent = <RoleInput />
  }else if (componentShow == "roleUser") {
    renderComponent = <RoleUser />
  }else if (componentShow == "dashboard") {
    renderComponent = <DashBoard />
  }else if (componentShow == "rolePermission") {
    renderComponent = <RolePermissionInput />
  }else if (componentShow == "menu") {
    renderComponent =  <OldMenuInput />
  }else if (componentShow == "menuPermission") {
    renderComponent = <MenuPermissionInput />
  }else if (componentShow == "menuInput") {
    renderComponent = <MenuInput />
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
