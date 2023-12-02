import { useState } from "react";
import {useStoreState} from 'easy-peasy'
import apiService from "../../../api";



const DistrictInput = () => {
    const { divisionList } = useStoreState((state) => state.division);
    const [district, setdistrict] = useState('');
    const [division, setdivision] = useState('');

    const handleChange = (e) =>{
        if(e.target.name == 'radio'){
            setdivision(e.target.value);
        }else{
            setdistrict(e.target.value);
        }
    }

      const handleSubmit = () => {
        if (district.length > 0) {
          const newData = {
            name: district,
            division: division,
          };
          const res = apiService.postData( 'http://127.0.0.1:8000/district/districts/', JSON.stringify(newData));
          console.log(res)
          setdistrict("");
        } else {
          alert("Please Insert district");
        }


      };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">District & Division Data Input</h4>
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
                        name="radio"
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

          <div style={{ display: division ? "block" : "none" }}>
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">District Name</label>
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
}

export default DistrictInput