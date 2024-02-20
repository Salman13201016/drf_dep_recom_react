

const SearchInput = ({ searchInput, setSearchInput, placeholder }) => {
  return (
    <div className="showSearch d-flex">
      <input
        className="form-control"
        type="search"
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SearchInput