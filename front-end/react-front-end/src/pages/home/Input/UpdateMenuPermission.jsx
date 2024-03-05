import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiService from "../../../api";

const initialValue = {
  role: "",
  menu: [],
};
const UpdateMenuPermissionInput = () => {
  const { menu, menuPermission } = useStoreState((state) => state);
  const { profile: userProfile } = useStoreState((state) => state);
    const { menuPermission: menuPermissionAction } = useStoreActions(
      (actions) => actions
    );
  const [menuPermissionInfo, setMenuPermissionInfo] = useState(initialValue);

  const handleChange = (e) => {
    if (e.target.name == "role") {
      setMenuPermissionInfo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    } else {
      if (e.target.checked) {
        setMenuPermissionInfo((prev) => {
          return {
            ...prev,
            menu: [...prev.menu, e.target.value],
          };
        });
      } else {
        setMenuPermissionInfo((prev) => {
          return {
            ...prev,
            menu: prev.menu.filter((item) => item !== e.target.value),
          };
        });
      }
    }
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const updatedMenu = {menu : menuPermissionInfo.menu};
    const response = await apiService.updateData(
      `http://127.0.0.1:8000/menu_permission/menuPermission/${menuPermissionInfo.role}/`,
      JSON.stringify(updatedMenu)
    );

    if(response.status == 200){
      toast.success('Updated Successfully');
      await menuPermissionAction.getMenuPermissionListFromServer(
        "http://127.0.0.1:8000/menu_permission/menuPermission/"
      );
    }
  }


  return (
    <div className="card">
      <ToastContainer />
      <div className="card-body">
        {/* <!-- Page Header --> */}
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Update Menu Permission</h3>
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
                    {menuPermission.menuPermissionList.map((singleMenu) => {
                      return (
                        <option key={singleMenu.id} value={singleMenu.id}>
                          {singleMenu.role_name}
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
                    <div className="input-group-append m-3">
                      <button
                        disabled={
                          !userProfile.userProfile.role_permissions.edit
                        }
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
    </div>
  );
};

export default UpdateMenuPermissionInput;
