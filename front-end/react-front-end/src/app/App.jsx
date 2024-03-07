
import "../assets/css/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "../pages/home";
import DigiverseMain from "../pages/digiverse";
import { useStoreActions} from 'easy-peasy'
import DigiverseLogin from "../pages/digiverse/login/DigiverseLogin";
import { DigiverseSignUp } from "../pages/digiverse/singUp/DigiverseSignUp";
import DigiversePrivacy from "../pages/digiverse/privacy/DigiversePrivacy";
import DigiverseTerms from "../pages/digiverse/terms/DigiverseTerms";
import DigiverseForgotPass from "../pages/digiverse/forgotPass/DigiverseForgotPass";
import DigiverseWelcome from "../pages/welcome/DigiverseWelcome";
import { GoogleLogIn } from "../pages/digiverse/googleLogIn/GoogleLogIn";
import DigiverseAbout from "../pages/digiverse/about/DigiverseAbout";




const App = () => {
  const {
    division,
    district,
    station,
    hospitalCategory,
    hospitalInfo,
    department,
    disease,
    hospitalMap,
    symptom,
    role,
    users,
    userRole,
    rolePermission,
    menu,
    menuPermission,
  } = useStoreActions((actions) => actions);
  division.getDivisionListFromServer(
    "http://127.0.0.1:8000/division/divisions/"
  );

  district.getDistrictListFromServer(
    "http://127.0.0.1:8000/district/districts/"
  );

  station.getStationFromServer("http://127.0.0.1:8000/station/stations/");

  hospitalCategory.getCategoryListFromServer(
    "http://127.0.0.1:8000/hospital_category/hospital_categories/"
  );

  hospitalInfo.getHospitalInfoFromServer(
    "http://127.0.0.1:8000/hospital/hospitals/"
  );

  department.getDepartmentListFromServer(
    "http://127.0.0.1:8000/departments/department/"
  );

  disease.getDiseaseListFromServer("http://127.0.0.1:8000/diseases/disease/");

  hospitalMap.getHospitalMapListFromServer(
    "http://127.0.0.1:8000/hospital-map-app/hospital-maps/"
  );

  symptom.getSymptomListFromServer("http://127.0.0.1:8000/symptoms/symptom/");

  role.getRoleListFromServer("http://127.0.0.1:8000/role/roles/");
  
  users.getUserListFromServer("http://127.0.0.1:8000/auth_user/user_emails/");
  
  userRole.getUserRoleListFromServer(
    "http://127.0.0.1:8000/user_role/user-role-panels/"
  );

  rolePermission.getRolePermissionListFromServer(
    "http://127.0.0.1:8000/role/crudOperation/"
  );

  menu.getMenuListFromServer("http://127.0.0.1:8000/menu_permission/menus/");
  
  menuPermission.getMenuPermissionListFromServer(
    "http://127.0.0.1:8000/menu_permission/menuPermission/"
  );
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DigiverseLogin />} />
        <Route path="/admin/:input" element={<HomePage />} />
        <Route path="/digiverse" element={<DigiverseMain />} />
        <Route path="/digiverse/login" element={<DigiverseLogin />} />
        <Route path="/digiverse/login/google" element={<GoogleLogIn />} />
        <Route
          path="/digiverse/login/forgotpass"
          element={<DigiverseForgotPass />}
        />
        <Route path="/digiverse/signup" element={<DigiverseSignUp />} />
        <Route path="/digiverse/privacy" element={<DigiversePrivacy />} />
        <Route path="/digiverse/terms" element={<DigiverseTerms />} />
        <Route path="/digiverse/welcome" element={<DigiverseWelcome />} />
        <Route path="/digiverse/about" element={<DigiverseAbout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App