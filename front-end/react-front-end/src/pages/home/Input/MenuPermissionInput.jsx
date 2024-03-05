import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import UpdateMenuPermissionInput from "./UpdateMenuPermission";
import apiService from "../../../api";
import DeleteModal from "../../../components/shared/modal/DeleteModal";

const initialValue = {
  role: "",
  menu: [],
};
const MenuPermissionInput = () => {
  const { role, menu, menuPermission } = useStoreState((state) => state);
  const { profile: userProfile } = useStoreState((state) => state);
  const { menuPermission: menuPermissionAction } = useStoreActions(
    (actions) => actions
  );
  const [menuPermissionInfo, setMenuPermissionInfo] = useState(initialValue);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.postData(
      "http://127.0.0.1:8000/menu_permission/menuPermission/",
      JSON.stringify(menuPermissionInfo)
    );
    if (response.status == 201) {
      toast.success("Successfully Added");
      menuPermissionAction.getMenuPermissionListFromServer(
        "http://127.0.0.1:8000/menu_permission/menuPermission/"
      );
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
      `http://127.0.0.1:8000/menu_permission/menuPermission/${itemId}/`
    );
    if (response.status == 204) {
      toast.warn("Deleted Successfully");
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
      await menuPermissionAction.getMenuPermissionListFromServer(
        "http://127.0.0.1:8000/menu_permission/menuPermission/"
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
                        disabled={
                          !userProfile.userProfile.role_permissions.insert
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
      <UpdateMenuPermissionInput />

      {/* <!-- Table Section --> */}
      {userProfile.userProfile.role_permissions.view ? (
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
                                  {singleMenuPermission.menu_names.join(", ")}
                                </td>
                                <td>
                                  <button
                                    disabled={
                                      !userProfile.userProfile.role_permissions
                                        .delete
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
