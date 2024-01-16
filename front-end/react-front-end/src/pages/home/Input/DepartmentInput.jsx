import { useState } from "react";
import {useStoreState} from 'easy-peasy'
import apiService from "../../../api";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";

const initialState = {
  hospital : '',
  name : '',
  details : '',
}
const DepartmentInput = () => {
  const { hospitalInfo, department } = useStoreState((state) => state);
  const [departmentInfo, setDepartmentInfo] = useState(initialState);
    const [currentPage, setcurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalshow, setIsEditModalShow] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItem, setSelectedItem] = useState("");
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentDepartment = department.departmentList.slice(firstPostIndex, lastPostIndex);


  const handleChange = (e) => {
    setDepartmentInfo((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  };

  const handleSubmit = () => {
    
    apiService.postData("http://127.0.0.1:8000/departments/department/",
    JSON.stringify(departmentInfo)
    );
    setDepartmentInfo(initialState)
  };

  const getCurrentPage = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (itemId) => {
    const response = apiService.deleteData(
      `http://127.0.0.1:8000/departments/department/${itemId}/`
    );

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
    setSelectedItem((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value,
      }
    });
  };
    const handleConfirmEdit = async () => {
      const response = apiService.updateData(`http://127.0.0.1:8000/departments/department/${selectedItem.id}/`, JSON.stringify(selectedItem));
      setSelectedItemId(null);
      setIsEditModalShow(false);
    };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Department Data Input</h4>
      </div>

      {/* select hospital */}
      <div className="card-body">
        <div className="form-group row">
          <label className="col-form-label col-md-2">Select Division</label>
          <div className="col-md-10">
            <select
              className="form-control"
              onChange={handleChange}
              name="hospital"
            >
              <option value="">Select</option>
              {hospitalInfo.hospitalInfoList.map((singledDetails) => {
                return (
                  <option key={singledDetails.id} value={singledDetails.id}>
                    {singledDetails.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* department name start */}
      <div className="card-body">
        <div className="form-group mb-0 row">
          <label className="col-form-label col-md-2">Department Name</label>
          <div className="col-md-10">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                value={hospitalInfo.depName}
                onChange={handleChange}
                name="name"
              />
            </div>
          </div>
        </div>
      </div>

      {/* department details start */}

      <div className="card-body">
        <div className="form-group row">
          <label className="col-form-label col-md-2">Details</label>
          <div className="col-md-10">
            <textarea
              rows="4"
              cols="4"
              className="form-control"
              placeholder="Enter Department Details Here"
              name="details"
              onChange={handleChange}
              value={hospitalInfo.depDetails}
            ></textarea>
            <div className="input-group-append" style={{ marginTop: "20px" }}>
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

      {/* <!-- Table Section --> */}
      <div>
        <div className="content container-fluid">
          {/* <!-- Page Header --> */}
          <div>
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Department List</h3>
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
                        {currentDepartment.map((singleDepartment, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * postPerPage + 1 + index}
                              </td>
                              <td>{singleDepartment.name}</td>
                              <td>
                                <div className="actions">
                                  <a
                                    className="btn btn-sm bg-success-light"
                                    onClick={() =>
                                      handleEditClick(singleDepartment)
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
                                      handleDeleteClick(singleDepartment.id)
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
              totalPost={department.departmentList.length}
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
        modalTitle={"Department Name"}
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

export default DepartmentInput