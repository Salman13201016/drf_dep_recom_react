import { useState } from "react";


const HospitalCategoryInput = () => {
    const [hospitalCategory, sethospitalCategory] = useState('')
      const handleChange = (e) => {
        sethospitalCategory(e.target.value);
      };
      const handleSubmit = () => {
        if (hospitalCategory.length > 0) {
          console.log(hospitalCategory);
          sethospitalCategory("");
        } else {
          alert("Please Insert Division");
        }
      };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Hospital Category Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          <div className="form-group mb-0 row">
            <label className="col-form-label col-md-2">Hospital Category</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={hospitalCategory}
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
}

export default HospitalCategoryInput