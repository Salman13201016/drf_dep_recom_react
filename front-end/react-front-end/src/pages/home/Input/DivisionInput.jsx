import { useState } from "react";
import apiService from "../../../api";


const DivisionInput = () => {
  const [division, setdivision] = useState('');
  const handleChange = (e) =>{
    setdivision(e.target.value)
  }
  const handleSubmit = () =>{
    const jsonData = {
      name : division
    }
    if(division.length>0){
          apiService.postData(
            "http://127.0.0.1:8000/division/divisions/",
            JSON.stringify(jsonData)
          );
    }else{
      alert('Please Insert Division')
    }
  }
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Division Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          <div className="form-group mb-0 row">
            <label className="col-form-label col-md-2">Division Name</label>
            <div className="col-md-10">
              <div className="input-group">
                <input className="form-control" type="text" value={division} onChange={handleChange} />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button" onClick={handleSubmit} >
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
}

export default DivisionInput