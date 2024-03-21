import { useStoreState } from "easy-peasy";
import {  useState } from "react";
import apiService from "../../../api";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";
import { ToastContainer, toast } from "react-toastify";
const initalValue = {
  user: "",
  role: "",
};
const RoleUser = () => {
    const { role, users } = useStoreState((state) => state);
    const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
    const [userRoleInfo, setUserRoleInfo] = useState(initalValue);
    const [currentPage, setcurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalshow, setIsEditModalShow] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItem, setSelectedItem] = useState("");
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;





    const handleChange = (e) => {
      setUserRoleInfo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    };

    const handleSubmit = async () => {
      const roleInfo = {
        select_role: userRoleInfo.role,
        select_user: userRoleInfo.user,
      };

      const response = await apiService.postData(
        "http://127.0.0.1:8000/user_role/user-role-panels/",
        JSON.stringify(roleInfo)
      );
      if(response.statusText == 'Created'){
        toast.success('Successfully Added')
      }else if(response.response.status == 400){
        toast.warn('This user is already assigned')
      }else{
        toast.warn(response.message)
        console.log(response)
      }

    };

    const getCurrentPage = (pageNumber) => {
      setcurrentPage(pageNumber);
    };

    const handleDeleteClick = (itemId) => {
      setSelectedItemId(itemId);
      setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = (itemId) => {
      apiService.deleteData(`http://127.0.0.1:8000/station/stations/${itemId}`);
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
    };

    const handleDeleteModalClose = () => {
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
    };

    const handleEditModalClose = () => {
      setSelectedItemId(null);
      setIsEditModalShow(false);
    };

    const handleEditClick = (item) => {
      setSelectedItemId(item.id);
      setSelectedItem(item);
      setIsEditModalShow(true);
    };
    const handleEditValueChange = (e) => {
      setSelectedItem((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    };

    const handleConfirmEdit = async () => {
      const response = apiService.updateData(
        `http://127.0.0.1:8000/station/stations/${selectedItem.id}/`,
        JSON.stringify(selectedItem)
      );
      setSelectedItemId(null);
      setIsEditModalShow(false);
    };
  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Role User Data Input</h4>
      </div>
      <div className="card-body">
        {/* User input start from here */}
        <div className="form-group row">
          <label className="col-form-label col-md-2">Select User</label>
          <div className="col-md-10">
            <select
              className="form-control"
              onChange={handleChange}
              name="user"
            >
              <option value="">Select</option>
              {users.userList.map((singleUser, index) => {
                return (
                  <option key={index} value={singleUser.id}>
                    {singleUser.email}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {/* Role input start from here */}
        <div className="form-group row">
          <label className="col-form-label col-md-2">Select Role</label>
          <div className="col-md-10">
            <select
              className="form-control"
              onChange={handleChange}
              name="role"
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
            <div className="input-group-append mt-2">
              <button
                disabled={!userProfile.role_permissions.insert}
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ background: "black" }} />
      {/* <!-- Table Section --> */}
      {userProfile.role_permissions.view ? (
        <div>
          <div className="content container-fluid">
            {/* <!-- Page Header --> */}
            <div>
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Role Users List</h3>
                </div>
              </div>
            </div>
            {/* <!-- /Page Header --> */}

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="datatable table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {role.roleList.map((singleStation, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {(currentPage - 1) * postPerPage + 1 + index}
                                </td>
                                <td>{singleStation.role}</td>
                                <td>
                                  <div className="actions">
                                    <button
                                      disabled={
                                        !userProfile.role_permissions.edit
                                      }
                                      className="btn btn-sm bg-success-light mr-2"
                                      onClick={() =>
                                        handleEditClick(singleStation)
                                      }
                                    >
                                      <i className="fa-solid fa-pen-to-square"></i>{" "}
                                    </button>
                                    <button
                                      disabled={
                                        !userProfile.role_permissions.delete
                                      }
                                      className="btn btn-sm bg-danger-light"
                                      onClick={() =>
                                        handleDeleteClick(singleStation.id)
                                      }
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </div>
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
            <div className="d-flex justify-content-center">
              <PaginationComponent
                currentPage={currentPage}
                postPerPage={postPerPage}
                totalPost={role.roleList.length}
                changePage={getCurrentPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3>You Do Not Have Access to The Table</h3>
          <h4>Make sure you are admin</h4>
        </div>
      )}

      {/* <!-- /Table Section --> */}

      {/* <!-- Delete Modal --> */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        itemId={selectedItemId}
      />
      {/* <!-- /Delete Modal --> */}

      {/* <!-- Edit Modal --> */}
      <EditModal
        isShow={isEditModalshow}
        handleClose={handleEditModalClose}
        modalTitle={"Station Name"}
        editValue={selectedItem.name}
        handleChange={handleEditValueChange}
        id={selectedItemId}
        fieldName={"name"}
        confirmEdit={handleConfirmEdit}
      />
      {/* <!-- /Edit Modal --> */}
    </div>
  );
};

export default RoleUser;
