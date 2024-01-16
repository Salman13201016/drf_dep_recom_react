import {useStoreState} from 'easy-peasy'
import { useEffect, useState } from 'react';
import apiService from '../../../api';

const initalValue = {
  department: "",
  disease: "",
  symptom1: "",
  symptom2: "",
  symptom3: "",
  symptom4: "",
  symptom5: "",
  symptom6: "",
  symptom7: "",
  symptom8: "",
  symptom9: "",
  symptom10: "",
  symptom11: "",
  symptom12: "",
  symptom13: "",
  symptom14: "",
  symptom15: "",
  symptom16: "",
  symptom17: "",
};

const SymtomsInput = () => {
  const { department, disease } = useStoreState((state) => state);
  const [symptomInfo, setSymptomInfo] = useState(initalValue);
  const [showDiseaseInJSX, setshowDiseaseInJSX] = useState("");
  const [initialInputNumber, setinitialInputNumber] = useState(5);
  const initalInput = [];
  for (let i = 0; i < initialInputNumber; i++) {
    initalInput.push(`symptom${i+1}`);
  }


  const handleChange = (e) =>{
    setSymptomInfo((prev)=>{
      return{
        ...prev,
        [e.target.name]: e.target.value
      }
    })

  }

  const handleSubmit = async () =>{
    const response = await apiService.postData('http://127.0.0.1:8000/symptoms/symptom/', JSON.stringify(symptomInfo))
  console.log(response)
  if(response.status == 201){
    console.log('successfully added');
    setSymptomInfo(initalValue)
  }
  }
  const handleAddMore = () =>{
    if (initialInputNumber >= 17) {
      return;
    } else {
      setinitialInputNumber(initialInputNumber+1)
    }
  }



    useEffect(() => {
      let selectedDisease = [];
      disease.diseaseList.forEach((element) => {
        if (element.department == symptomInfo.department) {
          selectedDisease.push(element);
        }
      });
      setshowDiseaseInJSX(selectedDisease);
      selectedDisease = [];

      if (!showDiseaseInJSX.length > 0) {
        setSymptomInfo((prev) => {
          return {
            ...prev,
            disease: "",
          };
        });
      }
    }, [
      disease.diseaseList,
      showDiseaseInJSX.length,
      symptomInfo.department,
    ]);



  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Symptom Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          {/* department start from here */}
          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Department</label>
            <div className="col-md-10">
              <select
                className="form-control"
                onChange={handleChange}
                name="department"
              >
                <option value="">Select</option>
                {department.departmentList.map((singleDepartment) => {
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

          {/* disease start from here */}
          {symptomInfo.department.length > 0 ? (
            <div className="form-group row">
              <label className="col-form-label col-md-2">Select Disease</label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  onChange={handleChange}
                  name="disease"
                >
                  {showDiseaseInJSX.map((singleDisease) => {
                    return (
                      <option key={singleDisease.id} value={singleDisease.id}>
                        {singleDisease.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          ) : (
            <p>Please select department above</p>
          )}

          <div>
            {initalInput.map((singleInput, index) => {
              return (
                <div className="form-group mb-2 row" key={index}>
                  <label className="col-form-label col-md-2">
                    {`Symptom ${index + 1}`}
                  </label>
                  <div className="col-md-10">
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="text"
                        value={symptomInfo.singleInput}
                        onChange={handleChange}
                        name={singleInput}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="input-group-append d-flex align-items-center justify-content-center">
            <button
              className="btn btn-primary mr-2"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleAddMore}
            >
              Add More Symptom
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SymtomsInput