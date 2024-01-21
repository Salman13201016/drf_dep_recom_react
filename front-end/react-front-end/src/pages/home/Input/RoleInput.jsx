import { useState } from "react";
import apiService from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import { useStoreState } from "easy-peasy";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";
import PaginationComponent from "../../../components/UI/pagination/Pagination";

const RoleInput = () => {
      const { divisionList } = useStoreState((state) => state.division);
      const [roleName, setRolName] = useState("");
      const [currentPage, setcurrentPage] = useState(1);
      const [postPerPage, setpostPerPage] = useState(5);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [isEditModalshow, setIsEditModalShow] = useState(false);
      const [selectedItemId, setSelectedItemId] = useState(null);
      const [selectedItemName, setSelectedItemName] = useState("");
      const [selectedEditItem, setSelectedEditItem] = useState("");
      const lastPostIndex = currentPage * postPerPage;
      const firstPostIndex = lastPostIndex - postPerPage;
      const currentDivision = divisionList.slice(firstPostIndex, lastPostIndex);

      const handleChange = (e) => {
        setRolName(e.target.value);
      };
      const handleSubmit = async () => {
        if (roleName.length > 0) {
          const response = await apiService.postData(
            "http://127.0.0.1:8000/division/divisions/",
            JSON.stringify({ name: roleName })
          );
          if (response.statusText == "Created") {
            toast.success("Role name added successfully!");
            setRolName("");
          }
        } else {
          toast.error("Please insert valid role");
        }
      };
      const getCurrentPage = (pageNumber) => {
        setcurrentPage(pageNumber);
      };

      const handleDeleteClick = (itemId) => {
        setSelectedItemId(itemId);
        setIsDeleteModalOpen(true);
      };

      const handleDeleteConfirm = async (itemId) => {
        const response = await apiService.deleteData(
          `http://127.0.0.1:8000/division/divisions/${itemId}/`
        );
        if (response.status == 204) {
          toast.warn("Division has been deleted");
          // Reset selectedItemId and close the modal
          setSelectedItemId(null);
          setIsDeleteModalOpen(false);
        } else {
          toast.error("Something went wrong");
        }
      };

      const handleDeleteModalClose = () => {
        // Reset selectedItemId and close the modal
        setSelectedItemId(null);
        setIsDeleteModalOpen(false);
      };
      const handleEditModalClose = () => {
        setSelectedItemId(null);
        setSelectedItemName("");
        setIsEditModalShow(false);
      };

      const handleEditClick = (singleDiv) => {
        setSelectedItemId(singleDiv.id);
        setSelectedItemName(singleDiv.name);
        setSelectedEditItem(singleDiv);
        setIsEditModalShow(true);
      };
      const handleEditValueChange = (e) => {
        setSelectedItemName(e.target.value);
      };

      const handleConfirmEdit = () => {
        setSelectedItemId(null);
        setSelectedItemName("");

        const finalData = { ...selectedEditItem, name: selectedItemName };
        apiService.updateData(
          `http://127.0.0.1:8000/division/divisions/${finalData.id}/`,
          JSON.stringify(finalData)
        );
        console.log(JSON.stringify(finalData));
        setIsEditModalShow(false);
      };
  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Role Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          <div className="form-group mb-0 row">
            <label className="col-form-label col-md-2">Admin/Doctor Name</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={roleName}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <button
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
        </form>
      </div>

      {/* <!-- Table Section --> */}
      <div>
        <div className="content container-fluid">
          {/* <!-- Page Header --> */}
          <div>
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Roles List</h3>
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
                          <th>Serial Number</th>
                          <th>Name</th>
                          <th>Update</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDivision.map((singleDivision, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * postPerPage + 1 + index}
                              </td>
                              <td>{singleDivision.name}</td>
                              <td>
                                <div className="actions">
                                  <a
                                    className="btn btn-sm bg-success-light"
                                    onClick={() =>
                                      handleEditClick(singleDivision)
                                    }
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                                    Edit
                                  </a>
                                </div>
                              </td>
                              <td>
                                <div className="actions">
                                  <a
                                    className="btn btn-sm bg-danger-light"
                                    onClick={() =>
                                      handleDeleteClick(singleDivision.id)
                                    }
                                  >
                                    <i className="fa fa-trash"></i> Delete
                                  </a>
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
              totalPost={divisionList.length}
              changePage={getCurrentPage}
            />
          </div>
        </div>
      </div>
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
        modalTitle={"Division Name"}
        editValue={selectedItemName}
        handleChange={handleEditValueChange}
        id={selectedItemId}
        confirmEdit={handleConfirmEdit}
      />
      {/* <!-- /Edit Modal --> */}
    </div>
  );
};

export default RoleInput;
