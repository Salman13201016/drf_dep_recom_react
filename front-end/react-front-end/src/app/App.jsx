
import "../assets/css/style.css";
import "../assets/css/feathericon.min.css";
import "../assets/css/font-awesome.min.css";
// import "../assets/css/bootstrap.min.css";
import "../assets/img/favicon.png";




import HomePage from "../pages/home";
import { useStoreActions} from 'easy-peasy'




const App = () => {
  const { division, district, station, hospitalCategory, hospitalInfo } =
    useStoreActions((actions) => actions);
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

  return (
    <div>
    <HomePage />
    </div>
  );
}

export default App