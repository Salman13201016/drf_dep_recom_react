import { useState } from "react";
import apiService from "../../../api";


const DepartmentInput = () => {

  const [department, setDepartment] = useState("");
  const handleChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleSubmit = () => {
    const jsonData = {
      name: department,
    };
    if (department.length > 0) {
      apiService.postData("http://127.0.0.1:8000/departments/department/", JSON.stringify(jsonData));
    console.log(JSON.stringify(jsonData));
    } else {
      alert("Please Insert Division");
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Department Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          <div className="form-group mb-0 row">
            <label className="col-form-label col-md-2">Department Name</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={department}
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
        </form>
      </div>
    </div>
  );
};

export default DepartmentInput