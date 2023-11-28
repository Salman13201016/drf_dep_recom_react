import PropTypes from "prop-types"

const InputButton = ({label, handleClick}) => {
  return (
    <div className="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0">
      <button type="button" className="btn btn-block btn-outline-primary" onClick={handleClick} >
        {label}
      </button>
    </div>
  );
}

InputButton.propTypes = {
    label : PropTypes.string,
    handleClick : PropTypes.func,
}

export default InputButton;