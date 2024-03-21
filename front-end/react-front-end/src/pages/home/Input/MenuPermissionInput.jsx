import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import UpdateMenuPermissionInput from "./UpdateMenuPermission";
import apiService from "../../../api";
import DeleteModal from "../../../components/shared/modal/DeleteModal";

const initialValue = {
  role: "",
  menus: [],
  submenus: [],
  menu_permission: false,
};
const MenuPermissionInput = () => {
  const { role, menu, menuPermission } = useStoreState((state) => state);
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const { menuPermission: menuPermissionAction } = useStoreActions(
    (actions) => actions
  );
  const [menuPermissionInfo, setMenuPermissionInfo] = useState(initialValue);
  const [selectedMainMenus, setSelectedMainMenus] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
    const response = await apiService.postData(
      "http://127.0.0.1:8000/menu_permission/menu-permission/create/",
      JSON.stringify(menuPermissionInfo)
    );
    if (response.status == 201) {
      toast.success("Successfully Added");
      menuPermissionAction.getMenuPermissionListFromServer(
        "http://127.0.0.1:8000/menu_permission/menu-permissions/"
      );
      setMenuPermissionInfo(initialValue)
    }else{
      toast.warn(response.message)
    }
  };

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    // Reset selectedItemId and close the modal
    setSelectedItemId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = async (itemId) => {
    const response = await apiService.deleteData(
      `http://127.0.0.1:8000/menu_permission/menu-permissions/${itemId}/`
    );
    if (response.status == 204) {
      toast.warn("Deleted Successfully");
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
      await menuPermissionAction.getMenuPermissionListFromServer(
        "http://127.0.0.1:8000/menu_permission/menu-permissions/"
      );
    } else {
      toast.error("Something went wrong");
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
                </div>
                {/* select menu end */}

                {/* menu permission status input start */}
                <div className="form-group mb-0 row mb-2">
                  <label className="col-form-label col-md-2">
                    Menu Permission
                  </label>
                  <div className="col-md-10 mt-2">
                    <div className="input-group">
                      <input
                        name="menu_permission"
                        onChange={handleChange}
                        type="checkbox"
                        style={{ width: "1em", height: "1em" }}
                      />
                    </div>
                    <div
                      className="input-group-append"
                      style={{ marginTop: "20px" }}
                    >
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
                {/* menu permission status input end */}
              </div>
            </div>
          </div>
        </form>
      </div>
      <UpdateMenuPermissionInput />

      {/* <!-- Table Section --> */}
      {userProfile.role_permissions.view ? (
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
                          <th>Serial</th>
                          <th>Role</th>
                          <th>Menu List</th>
                          <th>Sub Menu List</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menuPermission.menuPermissionList.map(
                          (singleMenuPermission, index) => {
                            return (
                              <tr key={singleMenuPermission.id}>
                                <td>
                                  {(currentPage - 1) * postPerPage + 1 + index}
                                </td>
                                <td>{singleMenuPermission.role_name}</td>
                                <td>
                                  {singleMenuPermission.menu_names &&
                                    singleMenuPermission.menu_names.map(
                                      (singleName) => {
                                        return `${singleName},`;
                                      }
                                    )}
                                </td>
                                <td>
                                  {singleMenuPermission.submenu_names &&
                                    singleMenuPermission.submenu_names.map(
                                      (singleName) => {
                                        return `${singleName},`;
                                      }
                                    )}
                                </td>
                                <td>
                                  <button
                                    disabled={
                                      !userProfile.role_permissions.delete
                                    }
                                    className="btn btn-sm bg-danger-light px-3"
                                    onClick={() =>
                                      handleDeleteClick(singleMenuPermission.id)
                                    }
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
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
      ) : (
        <div className="text-center">
          <h3>You Do Not Have Access to The Table</h3>
          <h4>Make sure you are admin</h4>
        </div>
      )}

      {/* <!-- Table Section --> */}
      {/* <!-- Delete Modal --> */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        itemId={selectedItemId}
      />
      {/* <!-- /Delete Modal --> */}
    </div>
  );
};

export default MenuPermissionInput;
