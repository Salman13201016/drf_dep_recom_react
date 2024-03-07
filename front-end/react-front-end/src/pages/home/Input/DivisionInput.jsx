import { useEffect, useState } from "react";
import apiService from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import { useStoreState, useStoreActions } from "easy-peasy";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import SearchInput from "../../../components/shared/input/SearchInput";

const DivisionInput = () => {
  const { getDivisionListFromServer } = useStoreActions(
    (actions) => actions.division
  );
  const { divisionList } = useStoreState((state) => state.division);
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const [searchInput, setSearchInput] = useState("");
  const [filteredDivision, setFilteredDivision] = useState(divisionList);
  const [division, setdivision] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedEditItem, setSelectedEditItem] = useState("");
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentDivision = filteredDivision.slice(firstPostIndex, lastPostIndex);



  useEffect(() => {
    const result = divisionList.filter((item) => {
      return searchInput.toLowerCase() === ""
        ? item
        : item.name.toLowerCase().includes(searchInput);
    });

    if (result.length) {
      setFilteredDivision(result);
    } else if (!searchInput.length) {
      setFilteredDivision(divisionList);
    } else {
      setFilteredDivision([]);
    }
  }, [searchInput, divisionList]);

  if (filteredDivision.length) {
    if (Math.ceil(filteredDivision.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  const handleChange = (e) => {
    setdivision(e.target.value);
  };
  const handleSubmit = async () => {
          if (division.length > 0) {
            const response = await apiService.postData(
              "http://127.0.0.1:8000/division/divisions/",
              JSON.stringify({ name: division })
            );
            if (response.statusText == "Created") {
              toast.success("Division added successfully!");
              setdivision("");
              await getDivisionListFromServer(
                "http://127.0.0.1:8000/division/divisions/"
              );
            }
          } else {
            toast.error("Please insert valid division");
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
      await getDivisionListFromServer(
        "http://127.0.0.1:8000/division/divisions/"
      );
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

  const handleConfirmEdit = async () => {
    setSelectedItemId(null);
    setSelectedItemName("");
    const finalData = { ...selectedEditItem, name: selectedItemName };
    const response = await apiService.updateData(
      `http://127.0.0.1:8000/division/divisions/${finalData.id}/`,
      JSON.stringify(finalData)
    );

    if (response.statusText == "OK") {
      setIsEditModalShow(false);
      toast.success("Successfully Updated");
      await getDivisionListFromServer(
        "http://127.0.0.1:8000/division/divisions/"
      );
    }
  };


  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Division Data Input</h4>
      </div>
      {userProfile.role_permissions.insert ? (
        <div className="card-body">
          <form action="#">
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">Division Name</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={division}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
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
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h3>You Do Not Have Access</h3>
        </div>
      )}

      <hr style={{ background: "black" }} />

      {/* <!-- Table Section --> */}
      {userProfile.role_permissions.view ? (
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

            {/* <!--select post per page and search input --> */}
            <div className="showTop d-flex w-100 justify-content-between">
              <SelectPostPerPage setpostPerPage={setpostPerPage} />
              <SearchInput
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                placeholder={"Search Division"}
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
                          {currentDivision.map((singleDivision, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {(currentPage - 1) * postPerPage + 1 + index}
                                </td>
                                <td>{singleDivision.name}</td>
                                <td>
                                  <button
                                    disabled={
                                      !userProfile.role_permissions.edit
                                    }
                                    className="btn btn-sm bg-success-light mr-2 px-3"
                                    onClick={() =>
                                      handleEditClick(singleDivision)
                                    }
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                                  </button>
                                  <button
                                    disabled={
                                      !userProfile.role_permissions.delete
                                    }
                                    className="btn btn-sm bg-danger-light px-3"
                                    onClick={() =>
                                      handleDeleteClick(singleDivision.id)
                                    }
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
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
                totalPost={filteredDivision.length}
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

export default DivisionInput;
