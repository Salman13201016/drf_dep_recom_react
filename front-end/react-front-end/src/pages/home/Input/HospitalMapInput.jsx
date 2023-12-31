import {useStoreState} from 'easy-peasy';
import { useState } from 'react';
import apiService from '../../../api';

const initalValue = {
    hospital : '',
    longitude : '',
    latitude : ''
}
const HospitalMap = () => {
    const { hospitalInfoList } = useStoreState((state) => state.hospitalInfo);
    const [hospitalMapInfo, sethospitalMapInfo] = useState(initalValue);
    const handleChange = (e) =>{
        sethospitalMapInfo((prev)=>{
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }
    const handleSubmit = () =>{
      apiService.postData(
        "http://127.0.0.1:8000/hospital-map-app/hospital-maps/",
        JSON.stringify(hospitalMapInfo)
      );
    }
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Hospital Map Data Input</h4>
        </div>
        <div className="card-body">
          <form action="#">
            {/* Division input start from here */}

            <div className="form-group row">
              <label className="col-form-label col-md-2">Hospital Name</label>
              <div className="col-md-10">
                {hospitalInfoList.map((singleHospital, index) => {
                  return (
                    <div className="radio" key={index}>
                      <label>
                        <input
                          type="radio"
                          name="hospital"
                          value={singleHospital.id}
                          onChange={handleChange}
                        />{" "}
                        {singleHospital.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* longitude input start from here */}

            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Longitude</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="number"
                      name="longitude"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* latitude input start from here */}
            <div>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Latitude</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="number"
                      name="latitude"
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
    </div>
  );
}

export default HospitalMap