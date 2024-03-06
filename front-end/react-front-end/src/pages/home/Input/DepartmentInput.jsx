import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import apiService from "../../../api";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import SearchInput from "../../../components/shared/input/SearchInput";
import DepartmentEditModal from "../../../components/shared/modal/DepartmentEditModal";
import { truncatedText } from "../../../utils/utils";

const initialState = {
  hospital: "",
  name: "",
  details: "",
};
const DepartmentInput = () => {
  const { hospitalInfo, department } = useStoreState((state) => state);
  const { getDepartmentListFromServer } = useStoreActions(
    (actions) => actions.department
  );
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const [searchInput, setSearchInput] = useState("");
  const [filteredDepartment, setFilteredDepartment] = useState(
    department.departmentList
  );
  const [departmentInfo, setDepartmentInfo] = useState(initialState);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentDepartment = filteredDepartment.slice(
    firstPostIndex,
    lastPostIndex
  );

  if (filteredDepartment.length) {
    if (Math.ceil(filteredDepartment.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    const result = department.departmentList.filter((item) => {
      return searchInput.toLowerCase() == ""
        ? item
        : item.name.toLowerCase().includes(searchInput);
    });

    if (result.length) {
      setFilteredDepartment(result);
    } else if (!searchInput.length) {
      setFilteredDepartment(department.departmentList);
    } else {
      setFilteredDepartment([]);
    }
  }, [searchInput, department.departmentList]);

  const handleChange = (e) => {
    setDepartmentInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.postData(
      "http://127.0.0.1:8000/departments/department/",
      JSON.stringify(departmentInfo)
    );
    if (response.status == 201) {
      setDepartmentInfo(initialState);
      toast.success("Sucessfully added");
      await getDepartmentListFromServer(
        "http://127.0.0.1:8000/departments/department/"
      );
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
      `http://127.0.0.1:8000/departments/department/${itemId}/`
    );
    if (response.status == 204) {
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
      toast.warn("Department Deleted");
      await getDepartmentListFromServer(
        "http://127.0.0.1:8000/departments/department/"
      );
    } else alert("Insert valid info");
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
      `http://127.0.0.1:8000/departments/department/${selectedItem.id}/`,
      JSON.stringify(selectedItem)
    );
    if (response.status == 200) {
      setSelectedItemId(null);
      setIsEditModalShow(false);
      toast.success("Successfully Updated");
      await getDepartmentListFromServer(
        "http://127.0.0.1:8000/departments/department/"
      );
    }
  };

  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Department Data Input</h4>
      </div>

      <form action="#" onSubmit={handleSubmit}>
        {/* select hospital */}
        <div className="card-body">
          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Hospital</label>
            <div className="col-md-10">
              <select
                className="form-control"
                onChange={handleChange}
                name="hospital"
                required
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
                  value={departmentInfo.name}
                  onChange={handleChange}
                  name="name"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* department details start */}

        <div className="card-body">
          <div className="form-group row">
            <label className="col-form-label col-md-2">
              Department Details
            </label>
            <div className="col-md-10">
              <textarea
                rows="4"
                cols="4"
                className="form-control"
                placeholder="Enter Department Details Here"
                name="details"
                onChange={handleChange}
                value={departmentInfo.details}
                required
              ></textarea>
              <div className="input-group-append" style={{ marginTop: "20px" }}>
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

      <hr style={{ background: "black" }} />

      {/* <!-- Table Section --> */}
      {userProfile.role_permissions.view ? (
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

            {/* <!--select post per page and search input --> */}
            <div className="showTop d-flex w-100 justify-content-between">
              <SelectPostPerPage setpostPerPage={setpostPerPage} />
              <SearchInput
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                placeholder={"Search Department"}
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
                            <th>Serial </th>
                            <th>Name</th>
                            <th>Deatils</th>
                            <th>Hospital</th>
                            <th>Actions</th>
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
                                <td>{singleDepartment.details}</td>
                                <td>
                                  {truncatedText(
                                    singleDepartment.hospital.name,
                                    30
                                  )}
                                </td>
                                <td>
                                  <div className="actions">
                                    <button
                                      disabled={
                                        !userProfile.role_permissions.edit
                                      }
                                      className="btn btn-sm bg-success-light mr-2"
                                      onClick={() =>
                                        handleEditClick(singleDepartment)
                                      }
                                    >
                                      <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                      disabled={
                                        !userProfile.role_permissions.delete
                                      }
                                      className="btn btn-sm bg-danger-light"
                                      onClick={() =>
                                        handleDeleteClick(singleDepartment.id)
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
                totalPost={filteredDepartment.length}
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
      <DepartmentEditModal
        isShow={isEditModalshow}
        depInfo={selectedItem}
        handleChange={handleEditValueChange}
        handleClose={handleEditModalClose}
        handleEditSubmit={handleConfirmEdit}
        modalTitle={"Edit Department"}
      />
      {/* <!-- /Edit Modal --> */}
    </div>
  );
};

export default DepartmentInput;
