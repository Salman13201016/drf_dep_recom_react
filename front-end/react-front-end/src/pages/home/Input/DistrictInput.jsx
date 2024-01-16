import { useState } from "react";
import { useStoreState } from "easy-peasy";
import apiService from "../../../api";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";

const DistrictInput = () => {
  const { divisionList } = useStoreState((state) => state.division);
  const { districtList } = useStoreState((state) => state.district);
  const [district, setdistrict] = useState("");
  const [division, setdivision] = useState("");
    const [currentPage, setcurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalshow, setIsEditModalShow] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItem, setSelectedItem] = useState("")
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentDistrict = districtList.slice(firstPostIndex, lastPostIndex);

  const handleChange = (e) => {
    if (e.target.name == "division") {
      setdivision(e.target.value);
    } else {
      setdistrict(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (district.length > 0) {
      const newData = {
        name: district,
        division: division,
      };
      apiService.postData(
        "http://127.0.0.1:8000/district/districts/",
        JSON.stringify(newData)
      );
      setdistrict("");
    } else {
      alert("Please Insert district");
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
    const response = apiService.deleteData(
      `http://127.0.0.1:8000/district/districts/${itemId}/`
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
    setSelectedItem(item)
    setIsEditModalShow(true);
  };
  const handleEditValueChange = (e) => {
    setSelectedItem((prev)=>{
      return{
        ...prev,
        [e.target.name]: e.target.value
      }
    });
  };

    const handleConfirmEdit = () => {
      const editedData = {
        id : selectedItem.id,
        name: selectedItem.name,
        division: selectedItem.division.id
      }
      setSelectedItemId(null);
      apiService.updateData(
        `http://127.0.0.1:8000/district/districts/${selectedItem.id}/`,
        JSON.stringify(editedData)
      );
      setIsEditModalShow(false);
    };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">District Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          {/* Division input start from here */}
          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Division</label>
            <div className="col-md-10">
              <select
                className="form-control"
                onChange={handleChange}
                name="division"
              >
                <option value="">Select</option>
                {divisionList.map((singleDivision) => {
                  return (
                    <option key={singleDivision.id} value={singleDivision.id}>
                      {singleDivision.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* district input start from here */}
          <div style={{ display: division ? "block" : "none" }}>
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">District Name</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={district}
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
                <h3 className="page-title">District List</h3>
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
                        {currentDistrict.map((singleDistrict, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * postPerPage + 1 + index}
                              </td>
                              <td>{singleDistrict.name}</td>
                              <td>
                                <div className="actions">
                                  <a
                                    className="btn btn-sm bg-success-light"
                                    onClick={() =>
                                      handleEditClick(singleDistrict)
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
                                      handleDeleteClick(singleDistrict.id)
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
              totalPost={districtList.length}
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

      <EditModal
        isShow={isEditModalshow}
        handleClose={handleEditModalClose}
        modalTitle={"District Name"}
        editValue={selectedItem.name}
        handleChange={handleEditValueChange}
        id={selectedItemId}
        fieldName="name"
        confirmEdit={handleConfirmEdit}
      />
      {/* <!-- /Edit Modal --> */}
    </div>
  );
};

export default DistrictInput;
