import { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import apiService from "../../../api";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";
import { ToastContainer, toast } from "react-toastify";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import SearchInput from "../../../components/shared/input/SearchInput";

const DistrictInput = () => {
  const { divisionList } = useStoreState((state) => state.division);
  const { districtList } = useStoreState((state) => state.district);
  const { getDistrictListFromServer } = useStoreActions(
    (actions) => actions.district
  );
  const [district, setdistrict] = useState("");
  const [division, setdivision] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const filteredDistrict = districtList.filter((item) => {
    return searchInput.toLowerCase() == ""
      ? item
      : item.name.toLowerCase().includes(searchInput);
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentDistrict = filteredDistrict.slice(firstPostIndex, lastPostIndex);

  if(filteredDistrict.length){
    if (Math.ceil(filteredDistrict.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  const handleChange = (e) => {
    if (e.target.name == "division") {
      setdivision(e.target.value);
    } else {
      setdistrict(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (district.length > 0) {
      const newData = {
        name: district,
        division: division,
      };
      const response = await apiService.postData(
        "http://127.0.0.1:8000/district/districts/",
        JSON.stringify(newData)
      );
      if (response.statusText == "Created") {
        toast.success("District added successfully!");
        setdistrict("");
        await getDistrictListFromServer(
          "http://127.0.0.1:8000/district/districts/"
        );
      }
    } else {
      alert("Please Insert District Name");
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
      `http://127.0.0.1:8000/district/districts/${itemId}/`
    );
    if (response.status == 204) {
      toast.warn("District has been deleted");
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
      await getDistrictListFromServer(
        "http://127.0.0.1:8000/district/districts/"
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
    const editedData = {
      id: selectedItem.id,
      name: selectedItem.name,
      division: selectedItem.division.id,
    };
    setSelectedItemId(null);
    const response = await apiService.updateData(
      `http://127.0.0.1:8000/district/districts/${selectedItem.id}/`,
      JSON.stringify(editedData)
    );
    if (response.statusText == "OK") {
      toast.success("Successfully Updated");
      await getDistrictListFromServer(
        "http://127.0.0.1:8000/district/districts/"
      );
    }
    setIsEditModalShow(false);
  };

  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">District Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#" onSubmit={handleSubmit}>
          {/* Division input start from here */}
          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Division</label>
            <div className="col-md-10">
              <select
                className="form-control"
                onChange={handleChange}
                name="division"
                required
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
          <div>
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">District Name</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={district}
                    onChange={handleChange}
                    required
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <hr style={{ background: "black" }} />

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

          {/* <!--select post per page and search input --> */}
          <div className="showTop d-flex w-100 justify-content-between">
            <SelectPostPerPage setpostPerPage={setpostPerPage} />
            <SearchInput
              searchInput={searchInput}
              setSearchInput={setSearchInput}
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
                        {currentDistrict.map((singleDistrict, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * postPerPage + 1 + index}
                              </td>
                              <td>{singleDistrict.name}</td>
                              <td>
                                <a
                                  className="btn btn-sm bg-success-light px-3 mr-2"
                                  onClick={() =>
                                    handleEditClick(singleDistrict)
                                  }
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                                <a
                                  className="btn btn-sm bg-danger-light px-3"
                                  onClick={() =>
                                    handleDeleteClick(singleDistrict.id)
                                  }
                                >
                                  <i className="fa fa-trash"></i>
                                </a>
                              </td>
                              <td>
                                <div className="actions"></div>
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
              totalPost={filteredDistrict.length}
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
