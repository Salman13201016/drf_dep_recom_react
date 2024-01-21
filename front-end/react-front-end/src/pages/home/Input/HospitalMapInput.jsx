import { useStoreState, useStoreActions } from "easy-peasy";
import { useState } from "react";
import apiService from "../../../api";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import MapEditModal from "../../../components/shared/modal/MapEditModal";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";

const initalValue = {
  hospital: "",
  longitude: "",
  latitude: "",
};
const HospitalMap = () => {
  const { hospitalInfo, hospitalMap } = useStoreState((state) => state);
  const { getHospitalMapListFromServer } = useStoreActions(
    (actions) => actions.hospitalMap
  );
  const [hospitalMapInfo, setHospitalMapInfo] = useState(initalValue);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentHospitalMapList = hospitalMap.hospitalMapList.slice(
    firstPostIndex,
    lastPostIndex
  );

  const handleChange = (e) => {
    setHospitalMapInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async () => {
    const res = await apiService.postData(
      "http://127.0.0.1:8000/hospital-map-app/hospital-maps/",
      JSON.stringify(hospitalMapInfo)
    );
    if (res.status == 201) {
      setHospitalMapInfo(initalValue);
      toast.success("Successfully added");
      await getHospitalMapListFromServer(
        "http://127.0.0.1:8000/hospital-map-app/hospital-maps/"
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
    // Perform the actual delete operation with the itemId
    const response = await apiService.deleteData(
      `http://127.0.0.1:8000/hospital-map-app/hospital-maps/${itemId}/`
    );
    if (response.status == 204) {
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
      toast.warn("Map has been deleted");
      await getHospitalMapListFromServer(
        "http://127.0.0.1:8000/hospital-map-app/hospital-maps/"
      );
    }
  };

  const handleDeleteModalClose = () => {
    // Reset selectedItemId and close the modal
    setSelectedItemId(null);
    setIsDeleteModalOpen(false);
  };
  const handleEditModalClose = () => {
    // setSelectedEditItem("");
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
      `http://127.0.0.1:8000/hospital-map-app/hospital-maps/${selectedItem.id}/`,
      JSON.stringify(selectedItem)
    );
    if (response.status == 200) {
      setSelectedItemId(null);
      setIsEditModalShow(false);
      toast.success('Updated Successfully');
      await getHospitalMapListFromServer(
        "http://127.0.0.1:8000/hospital-map-app/hospital-maps/"
      );
    }
  };

  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Hospital Map Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          {/* hospital input start from here */}
          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Hospital</label>
            <div className="col-md-10">
              <select
                className="form-control"
                onChange={handleChange}
                name="hospital"
              >
                <option value="">Select</option>
                {hospitalInfo.hospitalInfoList.map((singleHospital) => {
                  return (
                    <option key={singleHospital.id} value={singleHospital.id}>
                      {singleHospital.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* longitude input start from here */}

          <div style={{ marginBottom: "20px" }}>
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">Longitude</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="number"
                    name="longitude"
                    onChange={handleChange}
                    value={hospitalMapInfo.longitude}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* latitude input start from here */}
          <div>
            <div className="form-group mb-0 row">
              <label className="col-form-label col-md-2">Latitude</label>
              <div className="col-md-10">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="number"
                    name="latitude"
                    onChange={handleChange}
                    value={hospitalMapInfo.latitude}
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
                <h3 className="page-title">Hospital Maps List</h3>
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
                          <th>Latitude</th>
                          <th>Longitude</th>
                          <th>Update</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentHospitalMapList.map((singleMap, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * postPerPage + 1 + index}
                              </td>
                              <td>{singleMap.hospital_name}</td>
                              <td>{singleMap.latitude}</td>
                              <td>{singleMap.longitude}</td>
                              <td>
                                <div className="actions">
                                  <a
                                    className="btn btn-sm bg-success-light"
                                    onClick={() => handleEditClick(singleMap)}
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
                                      handleDeleteClick(singleMap.id)
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
              totalPost={hospitalMap.hospitalMapList.length}
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
      <MapEditModal
        isShow={isEditModalshow}
        handleClose={handleEditModalClose}
        modalTitle={"Map Info"}
        handleChange={handleEditValueChange}
        confirmEdit={handleConfirmEdit}
        handleEditSubmit={handleConfirmEdit}
        mapInfo={selectedItem}
      />
      {/* <!-- /Edit Modal --> */}
    </div>
  );
};

export default HospitalMap;
