import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiService from "../../../api";

const initialValue = {
  menus: [],
  submenus: [],
};
const UpdateMenuPermissionInput = () => {
  const { menu, menuPermission } = useStoreState((state) => state);
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const { menuPermission: menuPermissionAction } = useStoreActions(
    (actions) => actions
  );
  const [menuPermissionInfo, setMenuPermissionInfo] = useState(initialValue);
  const [selectedMainMenus, setSelectedMainMenus] = useState([]);
  const [selectedMenuPermissionID, setSelectedMenuPermissionID] = useState('')


    const handleMainMenuClick = (menuId) => {
      // Check if the menuId is already in the selectedMainMenus array
      const isMenuSelected = selectedMainMenus.includes(menuId);

      // Toggle the selection state
      if (isMenuSelected) {
        setSelectedMainMenus(selectedMainMenus.filter((id) => id !== menuId));
      } else {
        setSelectedMainMenus([...selectedMainMenus, menuId]);
      }
    };

  const handleChange = (e) => {
    if (e.target.name == "role") {
      setMenuPermissionInfo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    } else if (e.target.name == "menu_permission") {
      setMenuPermissionInfo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.checked,
        };
      });
    } else {
      if (e.target.checked) {
        setMenuPermissionInfo((prev) => {
          return {
            ...prev,
            [e.target.name]: [...prev[e.target.name], e.target.value],
          };
        });
      } else {
        setMenuPermissionInfo((prev) => {
          return {
            ...prev,
            [e.target.name]: prev[e.target.name].filter(
              (item) => item !== e.target.value
            ),
          };
        });
      }
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.updateData(
      `http://127.0.0.1:8000/menu_permission/menu-permissions/${selectedMenuPermissionID}/`,
      JSON.stringify(menuPermissionInfo)
    );
    if(response.status == 200){
      toast.success('Successfully Updated');
      menuPermissionAction.getMenuPermissionListFromServer(
        "http://127.0.0.1:8000/menu_permission/menu-permissions/"
      );
    }else{
      toast.warn(response.message)
    }

  };

  const getSelectedId = (e) =>{
    setSelectedMenuPermissionID(e.target.value);
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
                    onChange={getSelectedId}
                    name="role"
                    required
                  >
                    <option value="">Select</option>
                    {menuPermission.menuPermissionList.map(
                      (singleMenuPermission) => {
                        return (
                          <option
                            key={singleMenuPermission.id}
                            value={singleMenuPermission.id}
                          >
                            {singleMenuPermission.role_name}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                {/* select role end */}

                {/* select menu start */}
                <label className="col-form-label col-md-2 mt-2">
                  Select Menu
                </label>
                <div className="col-md-10 mt-3">
                  <div>
                    {menu.menuList.map((singleMenu) => {
                      return (
                        <div key={singleMenu.id}>
                          {/* main menu start */}
                          <div>
                            <input
                              type="checkbox"
                              value={singleMenu.id}
                              id={singleMenu.menu_name}
                              name="menus"
                              onChange={(e) => {
                                handleChange(e);
                                handleMainMenuClick(singleMenu.id);
                              }}
                            />
                            <label
                              className="ml-1"
                              htmlFor={singleMenu.menu_name}
                            >
                              {singleMenu.menu_name}
                            </label>
                          </div>
                          {/* main menu end */}

                          {/* sub menu start */}
                          {selectedMainMenus.includes(singleMenu.id) && (
                            <div className="ml-5">
                              {singleMenu.submenus.map(
                                (singleSubMenu, index) => {
                                  return (
                                    <div key={index}>
                                      <input
                                        name="submenus"
                                        type="checkbox"
                                        value={singleSubMenu.submenu_id}
                                        id={singleSubMenu.submenu_name}
                                        onChange={handleChange}
                                      />
                                      <label
                                        className="ml-1"
                                        htmlFor={singleSubMenu.submenu_name}
                                      >
                                        {singleSubMenu.submenu_name}
                                      </label>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}

                          {/* sub menu end */}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="input-group-append"
                    style={{ marginTop: "20px" }}
                  >
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmit}
                      disabled={!userProfile.role_permissions.edit}
                    >
                      Update
                    </button>
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
