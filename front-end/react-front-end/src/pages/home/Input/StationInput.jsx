import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import apiService from "../../../api";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";
import { toast, ToastContainer } from "react-toastify";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import SearchInput from "../../../components/shared/input/SearchInput";
const initalValue = {
  name: "",
  division: "",
  district: "",
};
const StationInput = () => {
  const {
    division: divisionFromServer,
    district: districtFromServer,
    station: stationFromServer,
  } = useStoreState((state) => state);
  const { getStationFromServer } = useStoreActions(
    (actions) => actions.station
  );
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const [searchInput, setSearchInput] = useState("");
  const filteredStation = stationFromServer.stationList.filter((item) => {
    return searchInput.toLowerCase() == ""
      ? item
      : item.name.toLowerCase().includes(searchInput);
  });
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
  const currentStation = filteredStation.slice(firstPostIndex, lastPostIndex);

     if(filteredStation.length){
       if (Math.ceil(filteredStation.length / postPerPage) < currentPage) {
         setcurrentPage(1);
       }
     }


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stationInfo.name.length > 0) {
      const response = await apiService.postData(
        "http://127.0.0.1:8000/station/stations/",
        JSON.stringify(stationInfo)
      );
      if (response.statusText == "Created"){
        setstationInfo(initalValue);
        toast.success('Station successfully added');
        getStationFromServer('http://127.0.0.1:8000/station/stations/');
      } 
      
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

  const handleDeleteConfirm = async (itemId) => {
    const response = await apiService.deleteData(`http://127.0.0.1:8000/station/stations/${itemId}`);
    if(response.status == 204){
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
      toast.warn('Station has been deleted');
      getStationFromServer("http://127.0.0.1:8000/station/stations/");
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
      `http://127.0.0.1:8000/station/stations/${selectedItem.id}/`,
      JSON.stringify(selectedItem)
    );
    if(response.statusText == 'OK'){
      setSelectedItemId(null);
      setIsEditModalShow(false);
      toast.success('Updated Successfully');
      getStationFromServer("http://127.0.0.1:8000/station/stations/");
    }
    
  };

  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Station Data Input</h4>
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
          <div>
            {showDistrictInJSX.length > 0 ? (
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Select District
                </label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="district"
                    required
                  >
                    <option value="">Select</option>
                    {showDistrictInJSX.map((singleDistrict) => {
                      return (
                        <option
                          key={singleDistrict.id}
                          value={singleDistrict.id}
                        >
                          {singleDistrict.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            ) : (
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Select District
                </label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="district"
                    required
                  >
                    <option value="">
                      District is not available in under this division
                    </option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* station input start from here */}

          <div>
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
                  <h3 className="page-title">Station List</h3>
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
                placeholder={"Search Station"}
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
                            <th>District</th>
                            <th>Division</th>
                            <th>Actions</th>
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
                                <td>{singleStation.district_name}</td>
                                <td>{singleStation.division_name}</td>
                                <td>
                                  <div className="actions">
                                    <button
                                      disabled={
                                        !userProfile.role_permissions.edit
                                      }
                                      className="btn btn-sm bg-success-light mr-2"
                                      onClick={() =>
                                        handleEditClick(singleStation)
                                      }
                                    >
                                      <i className="fa-solid fa-pen-to-square"></i>{" "}
                                    </button>
                                    <button
                                      disabled={
                                        !userProfile.role_permissions.delete
                                      }
                                      className="btn btn-sm bg-danger-light"
                                      onClick={() =>
                                        handleDeleteClick(singleStation.id)
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
                totalPost={filteredStation.length}
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

export default StationInput;
