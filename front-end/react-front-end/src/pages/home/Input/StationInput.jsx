import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
const initalValue = {
  name: "",
  division: "",
  district: "",
};
const StationInput = () => {
  const { division: divisionFromServer, district: districtFromServer } =
    useStoreState((state) => state);
  const [showDistrictInJSX, setshowDistrictInJSX] = useState("");
  const [stationInfo, setstationInfo] = useState(initalValue);

  useEffect(() => {
    let selectedDistrict = [];
    districtFromServer.districtList.forEach((element) => {
      if (element.division.name == stationInfo.division) {
        selectedDistrict.push(element.name);
      }
    });
    setshowDistrictInJSX(selectedDistrict);
    selectedDistrict = [];

    if (!showDistrictInJSX.length > 0) {
      setstationInfo((prev) => {
        return {
          ...prev,
          district: "",
        };
      });
    }
  }, [
    districtFromServer.districtList,
    showDistrictInJSX.length,
    stationInfo.division,
  ]);

  const handleChange = (e) => {
    setstationInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = () => {
    if (stationInfo.name.length > 0) {
      console.log(stationInfo);
      setstationInfo(initalValue);
    } else {
      alert("Please Enter Valid Station Name");
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

          {/* District  input start from here */}

          <div
            style={{
              display: stationInfo.division.length > 0 ? "block" : "none",
              marginBottom: "20px",
            }}
          >
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
              <p> District May Not Be Available or Please Select Division</p>
            )}
          </div>

          {/* station input start from here */}

          <div
            style={{
              display: stationInfo.district.length > 1 ? "block" : "none",
            }}
          >
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">Station Name</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={stationInfo.name}
                    onChange={handleChange}
                    name="name"
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
