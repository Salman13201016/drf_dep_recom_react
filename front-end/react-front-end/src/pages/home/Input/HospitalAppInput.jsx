import { useStoreState } from "easy-peasy";
import { useState, useEffect } from "react";
const initalState = {
  division: "",
  district: "",
  station: "",
  hospitalName: "",
  zipCode: "",
  address: "",
  picture: "",
  hospitalType: "",
  description: "",
};

const HospitalAppInput = () => {
  const { division, district, station, hospitalCategory } = useStoreState(
    (state) => state
  );
  const [showDistrictInJSX, setshowDistrictInJSX] = useState("");
  const [showStationInJSX, setshowStationInJSX] = useState("");
  const [hospitalInfo, setHospitalInfo] = useState(initalState);

  useEffect(() => {
    let selectedDistrict = [];
    district.districtList.forEach((element) => {
      if (element.division.name == hospitalInfo.division) {
        selectedDistrict.push(element.name);
      }
    });
    setshowDistrictInJSX(selectedDistrict);
    selectedDistrict = [];
  }, [district.districtList, hospitalInfo.division]);

  useEffect(() => {
    let selectedStation = [];
    station.stationList.forEach((element) => {
      if (element.district_name == hospitalInfo.district) {
        selectedStation.push(element.name);
      }
    });
    setshowStationInJSX(selectedStation);
    selectedStation = [];

  }, [hospitalInfo.district, station.stationList]);

  const handleChange = (e) => {
    setHospitalInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePicture = (e) => {
    setHospitalInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.files[0],
      };
    });
  };

  const handleSubmit = () => {
    console.log(hospitalInfo);
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Hospital Application</h4>
        </div>
        <div className="card-body">
          <form action="#">
            {/* Division input start from here */}
            <div className="form-group row">
              <label className="col-form-label col-md-2">Select Division</label>
              <div className="col-md-10">
                {division.divisionList.map((divisionName, index) => {
                  return (
                    <div className="radio" key={index}>
                      <label>
                        <input
                          type="radio"
                          name="division"
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

            {/* district input start from here */}
            {showDistrictInJSX.length > 0 ? (
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Select District
                </label>
                <div className="col-md-10">
                  {showDistrictInJSX.map((districtDetails, index) => {
                    return (
                      <div className="radio" key={index}>
                        <label>
                          <input
                            type="radio"
                            name="district"
                            value={districtDetails}
                            onChange={handleChange}
                          />{" "}
                          {districtDetails}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p>Please Select Divison Above</p>
            )}

            {/* station input start from here */}
            {showStationInJSX.length > 0 ? (
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Select Station
                </label>
                <div className="col-md-10">
                  {showStationInJSX.map((stationName, index) => {
                    return (
                      <div className="radio" key={index}>
                        <label>
                          <input
                            type="radio"
                            name="station"
                            value={stationName}
                            onChange={handleChange}
                          />{" "}
                          {stationName}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p>Please Select District Above</p>
            )}

            {/* hospital name input start from here */}
            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Hospital Name</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="hospitalName"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* zip code input start from here */}
            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Zip Code</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="number"
                      onChange={handleChange}
                      name="zipCode"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* address input start from here */}
            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Address</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="address"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* picture input start from here */}
            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Picture</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="picture"
                      type="file"
                      onChange={handlePicture}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* category input start from here */}
            <div className="form-group row">
              <label className="col-form-label col-md-2">
                Hospital Category
              </label>
              <div className="col-md-10">
                {hospitalCategory.categoryList.map((categoryName, index) => {
                  return (
                    <div className="radio" key={index}>
                      <label>
                        <input
                          type="radio"
                          name="hospitalType"
                          value={categoryName}
                          onChange={handleChange}
                        />{" "}
                        {categoryName}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* description input start from here */}
            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2"> Description</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="text"
                      onChange={handleChange}
                      name="description"
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
    </>
  );
};

export default HospitalAppInput;
