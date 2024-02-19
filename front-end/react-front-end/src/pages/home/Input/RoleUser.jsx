import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import apiService from "../../../api";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";
const initalValue = {
  name: "",
  division: "",
  district: "",
};
const RoleUser = () => {
    const {
      division: divisionFromServer,
      district: districtFromServer,
      station: stationFromServer,
      role
    } = useStoreState((state) => state);
    const [showDistrictInJSX, setshowDistrictInJSX] = useState("");
    const [stationInfo, setstationInfo] = useState(initalValue);
    const [currentPage, setcurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalshow, setIsEditModalShow] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItem, setSelectedItem] = useState("");
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentStation = stationFromServer.stationList.slice(
      firstPostIndex,
      lastPostIndex
    );

    useEffect(() => {
      let selectedDistrict = [];
      districtFromServer.districtList.forEach((element) => {
        if (element.division.id == stationInfo.division) {
          selectedDistrict.push(element);
        }
      });
      setshowDistrictInJSX(selectedDistrict);
      selectedDistrict = [];

      if (!showDistrictInJSX.length > 0) {
        setstationInfo((prev) => {
          return {
            ...prev,
            district: "",
          };
        });
      }
    }, [
      districtFromServer.districtList,
      showDistrictInJSX.length,
      stationInfo.division,
    ]);

    const handleChange = (e) => {
      setstationInfo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    };

    const handleSubmit = () => {
      if (stationInfo.name.length > 0) {
        apiService.postData(
          "http://127.0.0.1:8000/station/stations/",
          JSON.stringify(stationInfo)
        );
        setstationInfo(initalValue);
      } else {
        alert("Please Enter Valid Station Name");
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
      <div className="card-header">
        <h4 className="card-title">Role User Data Input</h4>
      </div>
      <div className="card-body">
        {/* Division input start from here */}
        <div className="form-group row">
          <label className="col-form-label col-md-2">Select Role</label>
          <div className="col-md-10">
            <select
              className="form-control"
              onChange={handleChange}
              name="division"
            >
              <option value="">Select</option>
              {divisionFromServer.divisionList.map((singleDivision) => {
                return (
                  <option key={singleDivision.id} value={singleDivision.id}>
                    {singleDivision.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* District input start from here */}
        <div
          style={{
            display: stationInfo.division.length > 0 ? "block" : "none",
            marginBottom: "20px",
          }}
        >
          {showDistrictInJSX.length > 0 ? (
            <div className="form-group row">
              <label className="col-form-label col-md-2">Select Username</label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  onChange={handleChange}
                  name="district"
                >
                  <option value="">Select</option>
                  {showDistrictInJSX.map((singleDistrict) => {
                    return (
                      <option key={singleDistrict.id} value={singleDistrict.id}>
                        {singleDistrict.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          ) : (
            <p> District May Not Be Available or Please Select Division</p>
          )}
        </div>

        {/* station input start from here */}

        <div
          style={{
            display: stationInfo.district.length ? "block" : "none",
          }}
        >
          <div className="form-group mb-0 row">
            <label className="col-form-label col-md-2">Station Name</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={stationInfo.name}
                  onChange={handleChange}
                  name="name"
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
      </div>
      {/* <!-- Table Section --> */}
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
                          <th>Serial Number</th>
                          <th>Name</th>
                          <th>Update</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentStation.map((singleStation, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * postPerPage + 1 + index}
                              </td>
                              <td>{singleStation.name}</td>
                              <td>
                                <div className="actions">
                                  <a
                                    className="btn btn-sm bg-success-light"
                                    onClick={() =>
                                      handleEditClick(singleStation)
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
                                      handleDeleteClick(singleStation.id)
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
              totalPost={stationFromServer.stationList.length}
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
