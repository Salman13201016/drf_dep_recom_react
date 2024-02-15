import { useState } from "react";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import SearchInput from "../../../components/shared/input/SearchInput";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import { useStoreState } from "easy-peasy";

const RolePermissionInput = () => {
  const { roleList } = useStoreState((state) => state.role);
  const [searchInput, setSearchInput] = useState("");
  const [postPerPage, setpostPerPage] = useState(5);

  const handleChange = (e) =>{
    console.log(e.target.value)
  }
  return (
    <div className="card">
      <div className="card-body">
        {/* <!-- Table Section --> */}
        <div>
          <div className="content container-fluid">
            {/* <!-- Page Header --> */}
            <div>
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Role Permission</h3>
                </div>
              </div>
            </div>
            {/* <!-- /Page Header --> */}

            {/* <!--select post per page and search input --> */}
            <div className="showTop d-flex w-100 justify-content-between">
              <SelectPostPerPage setpostPerPage={setpostPerPage} />

              <SearchInput
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>
            {/* <!--/select post per page and search input --> */}

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="datatable table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {roleList.map((singleRole, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {singleRole.role}
                                </td>
                                <td>
                                  <input name="edit" value={'edit'} onChange={handleChange} type="checkbox" />
                                </td>
                                <td>
                                  <input name="delete" value={'delete'} onChange={handleChange} type="checkbox" />
                                </td>
                                <td>
                                  <input name="view" value={'view'} onChange={handleChange} type="checkbox" />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Pagination --> */}
            {/* <div className="d-flex justify-content-center">
              <PaginationComponent
                currentPage={currentPage}
                postPerPage={postPerPage}
                totalPost={filteredDivision.length}
                changePage={getCurrentPage}
              />
            </div> */}
          </div>
        </div>
        {/* <!-- /Table Section --> */}
      </div>
    </div>
  );
};

export default RolePermissionInput;
