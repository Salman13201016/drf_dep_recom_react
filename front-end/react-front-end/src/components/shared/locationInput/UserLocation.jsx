import { useState } from "react";
import apiService from "../../../api";
const initalValue = {
  latitude: null,
  longitude: null,
};
const UserLocation = () => {
  const [location, setLocation] = useState(initalValue);
  const [nearestHospitals, setNearestHospitals] = useState("");
  const handleUserLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        if (position.coords.latitude && position.coords.longitude) {
          console.log(position.coords.longitude, position.coords.latitude);
          const response = await apiService.getData(
            `http://127.0.0.1:8000/hospital/nearest-hospitals/?long=${position.coords.longitude}&lat=${position.coords.latitude}`
          );
          if (response.length > 0) {
            setNearestHospitals(response);
            console.log(response);
          }
        }
      });
    } else {
      alert("Geolocation is not available in your browser.");
    }
  };

  const handleChange = (e) =>{
    console.log(e.target.value)
  }
  return (
    <div>
      <button onClick={handleUserLocation}>Nearest Hospital</button>

      <div className="d-flex">
        {nearestHospitals.length ? (
          nearestHospitals.map((singleHospital, index) => {
            return (
              <div key={index} className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{singleHospital.hospital_name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Card subtitle
                  </h6>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card content.
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Click above to show nearest hospitals</p>
        )}
      </div>

      <div>
        <input type="checkbox" id="test" value={'first test'} onChange={handleChange} />
        <label htmlFor="test">click here</label>
      </div>
    </div>
  );
};

export default UserLocation;
