

const SelectPostPerPage = ({ setpostPerPage }) => {
  return (
    <div className="showEntry d-flex">
      <p>Show</p>
      <select
        className="showEntiresSelect"
        onClick={(e) => setpostPerPage(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <p>entries</p>
    </div>
  );
};

export default SelectPostPerPage