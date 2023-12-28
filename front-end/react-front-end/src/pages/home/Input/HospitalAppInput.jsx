import { useStoreState } from "easy-peasy";
import { useState, useEffect } from "react";
import apiService from '../../../api/index'
const initalState = {
  division: "",
  district: "",
  station: "",
  name: "",
  zip_code: "",
  address: "",
  image: null,
  hos_type: "",
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
      if (element.division.id == hospitalInfo.division) {
        selectedDistrict.push(element);
      }
    });
    setshowDistrictInJSX(selectedDistrict);
    selectedDistrict = [];
  }, [district.districtList, hospitalInfo.division]);

  useEffect(() => {
    let selectedStation = [];
    station.stationList.forEach((element) => {
      if (element.district == hospitalInfo.district) {
        selectedStation.push(element);
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("division", hospitalInfo.division)
    formData.append("district", hospitalInfo.district);
    formData.append("station", hospitalInfo.station);
    formData.append("name", hospitalInfo.name);
    formData.append("zip_code", hospitalInfo.zip_code);
    formData.append("address", hospitalInfo.address);
    formData.append("image", hospitalInfo.image);
    formData.append("hos_type", hospitalInfo.hos_type);
    formData.append("description", hospitalInfo.description);
    apiService.postDataAsFormData(
      "http://127.0.0.1:8000/hospital/hospitals/",
      formData
    );

    setHospitalInfo(initalState)

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
                {division.divisionList.map((singleDivision, index) => {
                  return (
                    <div className="radio" key={index}>
                      <label>
                        <input
                          type="radio"
                          name="division"
                          value={singleDivision.id}
                          onChange={handleChange}
                        />{" "}
                        {singleDivision.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* district input start from here */}

            {showDistrictInJSX.length  ? (
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Select District
                </label>
                <div className="col-md-10">
                  {showDistrictInJSX.map((singleDistrict, index) => {
                    return (
                      <div className="radio" key={index}>
                        <label>
                          <input
                            type="radio"
                            name="district"
                            value={singleDistrict.id}
                            onChange={handleChange}
                          />{" "}
                          {singleDistrict.name}
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

            {showStationInJSX.length  ? (
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Select Station
                </label>
                <div className="col-md-10">
                  {showStationInJSX.map((singleStation, index) => {
                    return (
                      <div className="radio" key={index}>
                        <label>
                          <input
                            type="radio"
                            name="station"
                            value={singleStation.id}
                            onChange={handleChange}
                          />{" "}
                          {singleStation.name}
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
                      name="name"
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
                      name="zip_code"
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
                      name="image"
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
                {hospitalCategory.categoryList.map((category, index) => {
                  return (
                    <div className="radio" key={index}>
                      <label>
                        <input
                          type="radio"
                          name="hos_type"
                          value={category.id}
                          onChange={handleChange}
                        />{" "}
                        {category.name}
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
                        type="submit"
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
