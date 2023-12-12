import { useState } from "react";
import { useStoreState } from "easy-peasy";
import apiService from "../../../api";
const initalState = {
  department: "",
  name: "",
};
const DiseaseInput = () => {
  const { departmentList } = useStoreState((state) => state.department);
  const [diseaseInfo, setdiseaseInfo] = useState(initalState)

  
  const handleChange = (e) => {
    setdiseaseInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = () => {
    apiService.postData("http://127.0.0.1:8000/diseases/disease/", JSON.stringify(diseaseInfo));
    setdiseaseInfo(initalState);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Disease Details Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          {/* Department input start from here */}

          {/* <div className="form-group row">
            <label className="col-form-label col-md-2">Select Department</label>
            <div className="col-md-10">
              {departmentList.map((singleDepartment, index) => {
                return (
                  <div className="radio" key={index}>
                    <label>
                      <input
                        type="radio"
                        name="department"
                        value={singleDepartment.id}
                        onChange={handleChange}
                      />{" "}
                      {singleDepartment.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div> */}

          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Department</label>
            <div className="col-md-10">
              <select
                className="form-control"
                onChange={handleChange}
                name="department"
              >
                {departmentList.map((singleDepartment) => {
                  return (
                    <option
                      key={singleDepartment.id}
                      value={singleDepartment.id}
                    >
                      {singleDepartment.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Disease input start from here */}

          <div style={{ display: diseaseInfo.department ? "block" : "none" }}>
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">Disease Name</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={diseaseInfo.name}
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

export default DiseaseInput;
