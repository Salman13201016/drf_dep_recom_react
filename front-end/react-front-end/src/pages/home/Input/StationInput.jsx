import { useStoreState } from "easy-peasy";
import { useState } from "react";
import apiService from "../../../api";

const StationInput = () => {
  const { division: divisionFromServer, district: districtFromServer} = useStoreState((state) => state);
  const [district, setdistrict] = useState("");
  const [division, setdivision] = useState("");
  const [station, setstation] = useState("");




  const handleChange = (e) => {
    if (e.target.name == "divisionRadio") {
      setdivision(e.target.value);
    } else if (e.target.name == "districtRadio") {
      setdistrict(e.target.value);
    } else {
      setstation(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (district.length > 0 && station.length > 0) {
      const dataField = {name:station, division: division, district: district};
       apiService.postData(
        "http://127.0.0.1:8000/station/stations/",
        JSON.stringify(dataField)
      );

      console.log(JSON.stringify(dataField))
  
      setdistrict("");
      setstation("");
    } else {
      alert("Please Insert All Field");
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Station, District & Division Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          {/* Division input start from here */}

          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Division</label>
            <div className="col-md-10">
              {divisionFromServer.divisionList.map((divisionName, index) => {
                return (
                  <div className="radio" key={index}>
                    <label>
                      <input
                        type="radio"
                        name="divisionRadio"
                        value={divisionName}
                        onChange={handleChange}
                      />{" "}
                      {divisionName}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* District  input start from here */}

          <div
            style={{
              display: division ? "block" : "none",
              marginBottom: "20px",
            }}
          >
            <div className="form-group row">
              <label className="col-form-label col-md-2">Select District</label>
              <div className="col-md-10">
                {districtFromServer.districtList.map((districtName, index) => {
                  return (
                    <div className="radio" key={index}>
                      <label>
                        <input
                          type="radio"
                          name="districtRadio"
                          value={districtName}
                          onChange={handleChange}
                        />{" "}
                        {districtName}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

      

          {/* station input start from here */}

          <div style={{ display: district ? "block" : "none" }}>
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">Station Name</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={station}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationInput;
