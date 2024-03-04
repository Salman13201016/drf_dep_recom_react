import { useStoreState } from "easy-peasy";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const initalValue = {
  role: "",
  menuList: [],
};
const UpdateMenuPermissionInput = () => {
  const { role, menu } = useStoreState((state) => state);
  const [menuPermissionInfo, setMenuPermissionInfo] = useState(initalValue);
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const handleSubmit = () => {
    console.log(menuPermissionInfo);
  };

  const handleRolePermission = (e) => {
    if (e.target.name == "role") {
      setMenuPermissionInfo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    } else {
      setMenuPermissionInfo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.checked,
        };
      });
    }
  };
  return (
    <div className="card">
      <ToastContainer />
      <div className="card-body">
        {/* <!-- Page Header --> */}
        <div>
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Update Menu Permission</h3>
            </div>
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
                  {/* select role end */}
                </div>

                {/* select menu start */}

                <label className="col-form-label col-md-2 mt-2">
                  Select Menu
                </label>
                <div className="col-md-10 mt-2">
                  <div className="table-responsive">
                    <table className="datatable table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          {menu.menuList.map((singleMenu, index) => {
                            return (
                              <th key={singleMenu.id}>
                                <p>{singleMenu.menu_name}</p>
                                <input
                                  type="checkbox"
                                  name={singleMenu.menu_name}
                                />
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                    </table>
                    <div className="input-group-append mt-3">
                      <button className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>

                {/* select menu end */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenuPermissionInput;
