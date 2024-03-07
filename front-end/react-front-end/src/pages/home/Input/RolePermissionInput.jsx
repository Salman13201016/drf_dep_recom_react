import { useEffect, useState } from "react";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import SearchInput from "../../../components/shared/input/SearchInput";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import { useStoreActions, useStoreState } from "easy-peasy";
import apiService from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import UpdateRolePermission from "./UpdateRolePermission";

const initalValue = {
  role: null,
  view: false,
  insert: false,
  edit: false,
  delete: false,
};
const RolePermissionInput = () => {
  const { role, rolePermission } = useStoreState((state) => state);
  const { rolePermission:rolePermissionAction } = useStoreActions((actions) => actions);
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const [rolePermissionInput, setRolePermissionInput] = useState(initalValue);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRolePermissionList, setFilteredRolePermissionList] = useState(rolePermission.rolePermissionList);
  const [postPerPage, setpostPerPage] = useState(5);
   const [currentPage, setcurrentPage] = useState(1);
     const lastPostIndex = currentPage * postPerPage;
     const firstPostIndex = lastPostIndex - postPerPage;
     const currentRolePermissionList = filteredRolePermissionList.slice(
       firstPostIndex,
       lastPostIndex
     );



  const handleRolePermission = (e) => {
    if (e.target.name == "role") {
      setRolePermissionInput((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    } else {
      setRolePermissionInput((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.checked,
        };
      });
    }
  };

  const handleSubmit = async () => {
    // console.log(JSON.stringify(rolePermissionInput))
    if(rolePermissionInput.role){
      const response =  await apiService.postData(`http://127.0.0.1:8000/role/crudOperation/`, JSON.stringify(rolePermissionInput));
      if(response.status == 201){
        toast.success('Added Successfully');
          rolePermissionAction.getRolePermissionListFromServer(
            "http://127.0.0.1:8000/role/crudOperation/"
          );

      }else{
        console.log(response)
      }
    }
  };
  const handleChange = (e) =>{
    console.log(e.target.value)
  }

    useEffect(() => {
      const result = rolePermission.rolePermissionList.filter((item) => {
        return searchInput.toLowerCase() === ""
          ? item
          : item.name.toLowerCase().includes(searchInput);
      });

      if (result.length) {
        setFilteredRolePermissionList(result);
      } else if (!searchInput.length) {
        setFilteredRolePermissionList(rolePermission.rolePermissionList);
      } else {
        setFilteredRolePermissionList([]);
      }
    }, [searchInput, rolePermission.rolePermissionList]);

    if (filteredRolePermissionList.length) {
      if (Math.ceil(filteredRolePermissionList.length / postPerPage) < currentPage) {
        setcurrentPage(1);
      }
    }

  const getCurrentPage = (pageNumber) => {
    setcurrentPage(pageNumber);
  };


  return (
    <div className="card">
      <ToastContainer />
      <div className="card-body">
        <div>
          <div className="content container-fluid">
            {/* <!-- Page Header --> */}
            <div>
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Role Permission Input</h3>
                </div>
              </div>
            </div>
            {/* <!-- /Page Header --> */}

            <div className="card">
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-form-label col-md-2">Select Role</label>
                  <div className="col-md-10">
                    <select
                      className="form-control"
                      onChange={handleRolePermission}
                      name="role"
                      required
                    >
                      <option value="">Select</option>
                      {role.roleList.map((singleRole) => {
                        return (
                          <option key={singleRole.id} value={singleRole.id}>
                            {singleRole.role}
                          </option>
                        );
                      })}
                    </select>
                    <table className="datatable table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Edit</th>
                          <th>Delete</th>
                          <th>View</th>
                          <th>Insert</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              name="edit"
                              value={"edit"}
                              onChange={handleRolePermission}
                              type="checkbox"
                            />
                          </td>
                          <td>
                            <input
                              name="delete"
                              value={"delete"}
                              onChange={handleRolePermission}
                              type="checkbox"
                            />
                          </td>
                          <td>
                            <input
                              name="view"
                              value={"view"}
                              onChange={handleRolePermission}
                              type="checkbox"
                            />
                          </td>
                          <td>
                            <input
                              name="insert"
                              value={"insert"}
                              onChange={handleRolePermission}
                              type="checkbox"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="input-group-append mt-2">
                      <button
                        disabled={!userProfile.role_permissions.insert}
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ background: "black" }} />

            <h3 className="page-title">Update Role Permission</h3>
            <UpdateRolePermission />
            <hr style={{ background: "black" }} />

            {userProfile.role_permissions.view ? (
              <div>
                {/* <!--select post per page and search input --> */}
                <h3 className="page-title">Role Permission List</h3>
                <div className="showTop d-flex w-100 justify-content-between">
                  <SelectPostPerPage setpostPerPage={setpostPerPage} />

                  {/* <SearchInput
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                placeholder={'Search'}
              /> */}
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
                                <th>Insert</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentRolePermissionList.map(
                                (singleRolePermission) => {
                                  return (
                                    <tr key={singleRolePermission.id}>
                                      <td>{singleRolePermission.role_name}</td>
                                      <td>
                                        <input
                                          checked={singleRolePermission.edit}
                                          name="edit"
                                          value={"edit"}
                                          type="checkbox"
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          checked={singleRolePermission.delete}
                                          name="delete"
                                          value={"delete"}
                                          type="checkbox"
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          checked={singleRolePermission.view}
                                          name="view"
                                          value={"view"}
                                          type="checkbox"
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          checked={singleRolePermission.insert}
                                          name="insert"
                                          value={"insert"}
                                          type="checkbox"
                                          onChange={handleChange}
                                        />
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <PaginationComponent
                    currentPage={currentPage}
                    postPerPage={postPerPage}
                    totalPost={filteredRolePermissionList.length}
                    changePage={getCurrentPage}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3>You Do Not Have Access to The Table</h3>
                <h4>Make sure you are admin</h4>
              </div>
            )}

            {/* <!-- Table Section --> */}

            {/* <!-- Pagination --> */}
          </div>
        </div>
        {/* <!-- /Table Section --> */}
      </div>
    </div>
  );
};

export default RolePermissionInput;
