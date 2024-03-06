import { useState } from "react";
import apiService from "../../../api";
import { useStoreState, useStoreActions } from "easy-peasy";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";
import { toast, ToastContainer } from "react-toastify";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import SearchInput from "../../../components/shared/input/SearchInput";

const HospitalCategoryInput = () => {
  const { categoryList } = useStoreState((state) => state.hospitalCategory);
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const { getCategoryListFromServer } = useStoreActions(
    (actions) => actions.hospitalCategory
  );
  const [searchInput, setSearchInput] = useState("");
  const filteredCategory = categoryList.filter((item) => {
    return searchInput.toLowerCase() == ""
      ? item
      : item.name.toLowerCase().includes(searchInput);
  });
  const [hospitalCategory, sethospitalCategory] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentCategory = filteredCategory.slice(firstPostIndex, lastPostIndex);
  if (filteredCategory.length) {
    if (Math.ceil(filteredCategory.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }
  const handleChange = (e) => {
    sethospitalCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hospitalCategory.length > 0) {
      const response = await apiService.postData(
        "http://127.0.0.1:8000/hospital_category/hospital_categories/",
        JSON.stringify({ name: hospitalCategory })
      );
      if (response.statusText == "Created") {
        sethospitalCategory("");
        toast.success("Successfully added");
        getCategoryListFromServer(
          "http://127.0.0.1:8000/hospital_category/hospital_categories/"
        );
      }
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
    if (response.status == 204) {
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
      toast.warn("Category Deleted");
      getCategoryListFromServer(
        "http://127.0.0.1:8000/hospital_category/hospital_categories/"
      );
    }
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
    const response = await apiService.updateData(
      `http://127.0.0.1:8000/hospital_category/hospital_categories/${selectedItem.id}/`,
      JSON.stringify(selectedItem)
    );
    if (response.statusText == "OK") {
      setSelectedItemId(null);
      setIsEditModalShow(false);
      toast.success("Updated Successfully");
      getCategoryListFromServer(
        "http://127.0.0.1:8000/hospital_category/hospital_categories/"
      );
    }
  };

  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Hospital Category Input</h4>
      </div>
      <div className="card-body">
        <form action="#" onSubmit={handleSubmit}>
          <div className="form-group mb-0 row">
            <label className="col-form-label col-md-2">Hospital Category</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={hospitalCategory}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={!userProfile.role_permissions.insert}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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
                  <h3 className="page-title">Category List</h3>
                </div>
              </div>
            </div>
            {/* <!-- /Page Header --> */}

            {/* <!--select post per page and search input --> */}
            <div className="showTop d-flex w-100 justify-content-between">
              <SelectPostPerPage setpostPerPage={setpostPerPage} />
              <SearchInput
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                placeholder={"Search Category"}
              />
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
                            <th>Name</th>
                            <th>Actions</th>
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
                                      className="btn btn-sm bg-success-light mr-2"
                                      onClick={() =>
                                        handleEditClick(singleCategory)
                                      }
                                    >
                                      <i className="fa-solid fa-pen-to-square"></i>{" "}
                                    </a>
                                    <a
                                      className="btn btn-sm bg-danger-light"
                                      onClick={() =>
                                        handleDeleteClick(singleCategory.id)
                                      }
                                    >
                                      <i className="fa fa-trash"></i>
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
                totalPost={filteredCategory.length}
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
};

export default HospitalCategoryInput;
