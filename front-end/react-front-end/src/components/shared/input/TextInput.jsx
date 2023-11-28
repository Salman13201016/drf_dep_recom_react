
import PropTypes from 'prop-types'


const TextInput = ({ label, changeHandler, value }) => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <form action="#">
                <div className="form-group row">
                  <label className="col-form-label col-md-2">{label}</label>
                  <div className="col-md-10">
                    <input type="text" className="form-control" onChange={changeHandler} value={value} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


TextInput.propTypes = {
  label: PropTypes.string,
  changeHandler: PropTypes.func,
  value: PropTypes.string,
};



export default TextInput;


