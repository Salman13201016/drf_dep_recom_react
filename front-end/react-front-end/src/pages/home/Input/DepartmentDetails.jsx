import { useState } from "react";
import { useStoreState } from "easy-peasy";

const initalState = {
  department : '',
  description : '',
  put : '',
}
const DepartmentDetails = () => {
  const { departmentList } = useStoreState((state) => state.department);
  const [departmentDetailsInfo, setdepartmentDetailsInfo] =
    useState(initalState);

  const handleChange = (e) => {
    setdepartmentDetailsInfo((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  };

  const handleSubmit = () => {
    console.log(departmentDetailsInfo)
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Department Details Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          {/* Department input start from here */}

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

          {/* Put input start from here */}

          <div style={{ marginBottom: "20px" }}>
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">Put</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={departmentDetailsInfo.put}
                    onChange={handleChange}
                    name="put"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description input start from here */}

          <div>
            <div className="form-group row">
              <label className="col-form-label col-md-2">Description</label>
              <div className="col-md-10">
                <textarea
                  rows="4"
                  cols="4"
                  className="form-control"
                  placeholder="Enter Department Details Here"
                  name="description"
                  onChange={handleChange}
                  value={departmentDetailsInfo.description}
                ></textarea>
                <div
                  className="input-group-append"
                  style={{ marginTop: "20px" }}
                >
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
        </form>
      </div>
    </div>
  );
};

export default DepartmentDetails;
