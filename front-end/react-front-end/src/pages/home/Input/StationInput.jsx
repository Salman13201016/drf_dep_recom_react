import { useStoreState } from "easy-peasy";
import { useState } from "react";

const StationInput = () => {
        const { divisionList } = useStoreState((state) => state.division);
            const [district, setdistrict] = useState("");
            const [division, setdivision] = useState("");


                const handleChange = (e) => {
                  if (e.target.name == "divisionRadio") {
                    setdivision(e.target.value);
                  } else {
                    setdistrict(e.target.value);
                  }
                };

                const handleSubmit = () => {
                  if (district.length > 0) {
                    console.log(division, district);
                    setdistrict("");
                  } else {
                    alert("Please Insert district");
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
              {divisionList.map((divisionName, index) => {
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

          {/* station input start from here */}

          <div style={{ display: division ? "block" : "none" }}>
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">Station Name</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={district}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
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
