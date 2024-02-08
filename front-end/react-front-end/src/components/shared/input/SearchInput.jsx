

const SearchInput = ({ searchInput, setSearchInput }) => {
  return (
    <div className="showSearch d-flex">
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SearchInput