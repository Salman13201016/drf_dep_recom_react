import { useState } from "react";
import apiService from "../../../api";
import { useStoreState } from "easy-peasy";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";


const HospitalCategoryInput = () => {
    const { categoryList } = useStoreState((state) => state.hospitalCategory);
    const [hospitalCategory, sethospitalCategory] = useState('');
      const [currentPage, setcurrentPage] = useState(1);
      const [postPerPage, setpostPerPage] = useState(5);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [isEditModalshow, setIsEditModalShow] = useState(false);
      const [selectedItemId, setSelectedItemId] = useState(null);
      const [selectedItem, setSelectedItem] = useState("");
      const lastPostIndex = currentPage * postPerPage;
      const firstPostIndex = lastPostIndex - postPerPage;
      const currentCategory = categoryList.slice(firstPostIndex, lastPostIndex);
      const handleChange = (e) => {
        sethospitalCategory(e.target.value);
      };
      const handleSubmit = () => {
        if (hospitalCategory.length > 0) {
          const categoryData = {name:hospitalCategory};
          apiService.postData(
            "http://127.0.0.1:8000/hospital_category/hospital_categories/",
            JSON.stringify(categoryData)
          );
          sethospitalCategory("");
        } else {
          alert("Please Insert Information");
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
          `http://127.0.0.1:8000/hospital_category/hospital_categories/${itemId}`
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
            [e.target.name] : e.target.value
          }
        })
      };

        const handleConfirmEdit = () => {
          apiService.updateData(
            `http://127.0.0.1:8000/hospital_category/hospital_categories/${selectedItem.id}/`, JSON.stringify(selectedItem)
          );
          setSelectedItemId(null);
          setIsEditModalShow(false);
        };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Hospital Category Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          <div className="form-group mb-0 row">
            <label className="col-form-label col-md-2">Hospital Category</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={hospitalCategory}
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
                <h3 className="page-title">Divisions List</h3>
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
                        {currentCategory.map((singleCategory, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * postPerPage + 1 + index}
                              </td>
                              <td>{singleCategory.name}</td>
                              <td>
                                <div className="actions">
                                  <a
                                    className="btn btn-sm bg-success-light"
                                    onClick={() =>
                                      handleEditClick(singleCategory)
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
                                      handleDeleteClick(singleCategory.id)
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
              totalPost={categoryList.length}
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
        modalTitle={"Category Name"}
        editValue={selectedItem.name}
        handleChange={handleEditValueChange}
        id={selectedItemId}
        fieldName={"name"}
        confirmEdit={handleConfirmEdit}
      />
      {/* <!-- /Edit Modal --> */}
    </div>
  );
}

export default HospitalCategoryInput