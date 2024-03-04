import { useStoreState } from "easy-peasy";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import UpdateMenuPermissionInput from "./UpdateMenuPermission";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import apiService from "../../../api";

const initialValue = {
  role: "",
  menu: [],
};
const MenuPermissionInput = () => {
  const { role, menu, rolePermission } = useStoreState((state) => state);
  const [menuPermissionInfo, setMenuPermissionInfo] = useState(initialValue);
  
  const handleChange = (e) => {
    if(e.target.name=='role'){
      setMenuPermissionInfo((prev)=>{
        return {
          ...prev,
          [e.target.name] : e.target.value
        }
      })
    }else{
      if(e.target.checked){
        setMenuPermissionInfo((prev)=>{
          return{
            ...prev,
            menu: [...prev.menu, e.target.value]
          }
        })
      }else{
        setMenuPermissionInfo((prev)=>{
          return {
            ...prev,
            menu: prev.menu.filter(item => item !== e.target.value)
          }
        })
      }
    }
  };
  const handleSubmit = async () => {
    const response = await apiService.postData(
      "http://127.0.0.1:8000/menu_permission/menuPermission/",
      JSON.stringify(menuPermissionInfo)
    );
    if(response.status == 201){
      toast.success('Successfully Added')
    }
  };

  return (
    <div className="card">
      <ToastContainer />
      <div className="card-body">
        {/* <!-- Page Header --> */}
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Menu Permission Input</h3>
          </div>
        </div>

        {/* <!-- /Page Header --> */}
        <form action="#">
          <div className="card">
            <div className="card-body">
              <div className="form-group row">
                {/* select role start */}
                <label className="col-form-label col-md-2">Select Role</label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    onChange={handleChange}
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
                </div>
                {/* select role end */}

                {/* select menu start */}
                <label className="col-form-label col-md-2 mt-2">
                  Select Menu
                </label>
                <div className="col-md-10 mt-2">
                  <div className="table-responsive">
                    <table className="datatable table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          {menu.menuList.map((singleMenu) => {
                            return (
                              <th key={singleMenu.id}>
                                <p>{singleMenu.menu_name}</p>
                                <input
                                  type="checkbox"
                                  value={singleMenu.id}
                                  onChange={handleChange}
                                />
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                    </table>
                    <div className="input-group-append mt-3 ml-3">
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                {/* select menu end */}
              </div>
            </div>
          </div>
        </form>
      </div>
      <UpdateMenuPermissionInput />

      {/* <!-- Table Section --> */}

      <div className="card-body">
        {/* <!--select post per page and search input --> */}
        <div>
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Menu Permission List</h3>
            </div>
          </div>
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
                      {rolePermission.rolePermissionList.map(
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
      </div>
      {/* <!-- Table Section --> */}
    </div>
  );
};

export default MenuPermissionInput;
