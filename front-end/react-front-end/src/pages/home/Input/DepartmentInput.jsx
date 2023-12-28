import { useState } from "react";
import {useStoreState} from 'easy-peasy'
import apiService from "../../../api";

const initialState = {
  hospital : '',
  name : '',
  details : '',
}
const DepartmentInput = () => {

  const { hospitalInfo } = useStoreState((state) => state);
  const [departmentInfo, setDepartmentInfo] = useState(initialState);


  const handleChange = (e) => {
    setDepartmentInfo((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  };

  const handleSubmit = () => {
    
    apiService.postData("http://127.0.0.1:8000/departments/department/",
    JSON.stringify(departmentInfo)
    );
    setDepartmentInfo(initialState)
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Department Data Input</h4>
      </div>

      {/* select hospital */}

      <div className="card-body">
        <div className="form-group row">
          <label className="col-form-label col-md-2">Select Hospital</label>
          <div className="col-md-10">
            {hospitalInfo.hospitalInfoList.map((singledDetails, index) => {
              return (
                <div className="radio" key={index}>
                  <label>
                    <input
                      type="radio"
                      name="hospital"
                      value={singledDetails.id}
                      onChange={handleChange}
                    />{" "}
                    {singledDetails.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* department name start */}
      <div className="card-body">
        <div className="form-group mb-0 row">
          <label className="col-form-label col-md-2">Department Name</label>
          <div className="col-md-10">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                value={hospitalInfo.depName}
                onChange={handleChange}
                name="name"
              />
            </div>
          </div>
        </div>
      </div>

      {/* department details start */}

      <div className="card-body">
        <div className="form-group row">
          <label className="col-form-label col-md-2">Details</label>
          <div className="col-md-10">
            <textarea
              rows="4"
              cols="4"
              className="form-control"
              placeholder="Enter Department Details Here"
              name="details"
              onChange={handleChange}
              value={hospitalInfo.depDetails}
            ></textarea>
            <div className="input-group-append" style={{ marginTop: "20px" }}>
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
  );
};

export default DepartmentInput