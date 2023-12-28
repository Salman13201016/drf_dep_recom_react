import {useStoreState} from 'easy-peasy'

const SymtomsInput = () => {
  const { department, disease } = useStoreState((state) => state);
  console.log(disease.diseaseList);

  const handleChange = (e) =>{
    console.log(e.target.name, e.target.value)
  }
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
              <select className="form-control" onChange={handleChange}>
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
          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Disease</label>
            <div className="col-md-10">
              <select className="form-control" onChange={handleChange} name='disease' >
                {disease.diseaseList.map((singleDisease) => {
                  return (
                    <option key={singleDisease.id} value={singleDisease.id} >
                      {singleDisease.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SymtomsInput