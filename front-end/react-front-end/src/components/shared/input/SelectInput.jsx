import Proptypes from "prop-types";


const SelectInputRadio = ({label, name, handleChange}) => {
  return (
    <>
      <input type="radio" id={name} name={name} value={label} onChange={handleChange}/>
      <label htmlFor={name}>{label}</label><br></br>
    </>
  );
};


SelectInputRadio.propTypes = {
  label: Proptypes.string,
  name: Proptypes.string,
  handleChange: Proptypes.func,
};

export default SelectInputRadio;
