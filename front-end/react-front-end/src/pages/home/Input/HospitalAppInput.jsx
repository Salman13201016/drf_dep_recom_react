import { useStoreState, useStoreActions } from "easy-peasy";
import { useState, useEffect } from "react";
import apiService from '../../../api/index'
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import HospitalEditModal from "../../../components/shared/modal/HospitalEditModal";
import { toast, ToastContainer } from "react-toastify";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import SearchInput from "../../../components/shared/input/SearchInput";
const initalState = {
  division: "",
  district: "",
  station: "",
  name: "",
  zip_code: "",
  address: "",
  image: null,
  hos_type: "",
  description: "",
};

const HospitalAppInput = () => {
  const { division, district, station, hospitalCategory, hospitalInfo: hospitalInfoFromServer } =
    useStoreState((state) => state);
    const { getHospitalInfoFromServer } = useStoreActions(
      (actions) => actions.hospitalInfo
    );

    const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));

  const [searchInput, setSearchInput] = useState("");
  const [filteredHospital, setFilteredHospital] = useState(
    hospitalInfoFromServer.hospitalInfoList
  );


  const [showDistrictInJSX, setshowDistrictInJSX] = useState("");
  const [showStationInJSX, setshowStationInJSX] = useState("");
  const [hospitalInfo, setHospitalInfo] = useState(initalState);

    const [currentPage, setcurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalshow, setIsEditModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState("")
    const [selectedItemId, setSelectedItemId] = useState(null);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentHospitalInfo = filteredHospital.slice(
      firstPostIndex,
      lastPostIndex
    );

      useEffect(() => {
        const result = hospitalInfoFromServer.hospitalInfoList.filter(
          (item) => {
            return searchInput.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(searchInput);
          }
        );

        if (result.length) {
          setFilteredHospital(result);
        } else if (!searchInput.length) {
          setFilteredHospital(divisionList);
        } else {
          setFilteredHospital([]);
        }
      }, [searchInput, hospitalInfoFromServer.hospitalInfoList]);

      if (filteredHospital.length) {
        if (Math.ceil(filteredHospital.length / postPerPage) < currentPage) {
          setcurrentPage(1);
        }
      }


      useEffect(() => {
        let selectedDistrict = [];
        district.districtList.forEach((element) => {
          if (element.division.id == hospitalInfo.division) {
            selectedDistrict.push(element);
          }
        });
        setshowDistrictInJSX(selectedDistrict);
        selectedDistrict = [];
      }, [district.districtList, hospitalInfo.division]);

      useEffect(() => {
        let selectedStation = [];
        station.stationList.forEach((element) => {
          if (element.district == hospitalInfo.district) {
            selectedStation.push(element);
          }
        });
        setshowStationInJSX(selectedStation);
        selectedStation = [];
      }, [hospitalInfo.district, station.stationList]);

      const handleChange = (e) => {
        setHospitalInfo((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      };

      const handlePicture = (e) => {
        setHospitalInfo((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.files[0],
          };
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("division", hospitalInfo.division);
        formData.append("district", hospitalInfo.district);
        formData.append("station", hospitalInfo.station);
        formData.append("name", hospitalInfo.name);
        formData.append("zip_code", hospitalInfo.zip_code);
        formData.append("address", hospitalInfo.address);
        formData.append("image", hospitalInfo.image);
        formData.append("hos_type", hospitalInfo.hos_type);
        formData.append("description", hospitalInfo.description);

        const response = await apiService.postDataAsFormData(
          "http://127.0.0.1:8000/hospital/hospitals/",
          formData
        );
          setHospitalInfo(initalState);
          toast.success('Successfully Added');
          await getHospitalInfoFromServer(
            "http://127.0.0.1:8000/hospital/hospitals/"
          );
        
        
      };

    const getCurrentPage = (pageNumber) => {
      setcurrentPage(pageNumber);
    };

    const handleDeleteClick = (itemId) => {
      setSelectedItemId(itemId);
      setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async (itemId) => {
      const response = await apiService.deleteData(`http://127.0.0.1:8000/hospital/hospitals/${itemId}/`);
      if(response.status == 204){
        // Reset selectedItemId and close the modal
        setSelectedItemId(null);
        setIsDeleteModalOpen(false);
        toast.warn("Hospital info deleted");
        await getHospitalInfoFromServer(
          "http://127.0.0.1:8000/hospital/hospitals/"
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
      setSelectedItemId(item.id)
      setSelectedItem(item);
      setIsEditModalShow(true);
    };
    const handleEditValueChange = (e) => {
      setSelectedItem((prev)=>{
        return {
          ...prev,
          [e.target.name] : e.target.value
        }
      });
    };

    const handleEditSubmit = async () =>{
      const formDataEdit = new FormData();
      formDataEdit.append("name", selectedItem.name);
      formDataEdit.append("zip_code", selectedItem.zip_code);
      formDataEdit.append("address", selectedItem.address);
      const response = await apiService.updateDataAsFormData(
        `http://127.0.0.1:8000/hospital/hospitals/${selectedItem.id}/`, formDataEdit
      );
      setIsEditModalShow(false);
      toast.warn('Updated Successfully');
      await getHospitalInfoFromServer(
        "http://127.0.0.1:8000/hospital/hospitals/"
      );

    }



  return (
    <>
      <div className="card">
        <ToastContainer />
        <div className="card-header">
          <h4 className="card-title">Hospital Application</h4>
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
                  {division.divisionList.map((singleDivision) => {
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
            <div className="form-group row">
              <label className="col-form-label col-md-2">Select District</label>

              {showDistrictInJSX.length ? (
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
              ) : (
                <div className="col-md-10">
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="district"
                    required
                  >
                    <option value="">
                      District is not available under this division
                    </option>
                  </select>
                </div>
              )}
            </div>

            {/* station input start from here */}
            <div className="form-group row">
              <label className="col-form-label col-md-2">Select Station</label>
              {showStationInJSX.length ? (
                <div className="col-md-10">
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="station"
                    required
                  >
                    <option value="">Select</option>
                    {showStationInJSX.map((singleStation) => {
                      return (
                        <option key={singleStation.id} value={singleStation.id}>
                          {singleStation.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : (
                <div className="col-md-10">
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="station"
                    required
                  >
                    <option value="">Station is not available</option>
                  </select>
                </div>
              )}
            </div>

            {/* hospital name input start from here */}

            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Hospital Name</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* zip code input start from here */}

            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Zip Code</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="number"
                      onChange={handleChange}
                      name="zip_code"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* address input start from here */}

            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Address</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="address"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* picture input start from here */}

            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2">Picture</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="image"
                      type="file"
                      onChange={handlePicture}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* category input start from here */}
            <div className="form-group row">
              <label className="col-form-label col-md-2">Select Category</label>
              {hospitalCategory.categoryList.length ? (
                <div className="col-md-10">
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="hos_type"
                    required
                  >
                    <option value="">Select</option>
                    {hospitalCategory.categoryList.map((singleCategory) => {
                      return (
                        <option
                          key={singleCategory.id}
                          value={singleCategory.id}
                        >
                          {singleCategory.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : (
                <div className="col-md-10">
                  <select className="form-control">
                    <option value="">Select category is not available</option>
                  </select>
                </div>
              )}
            </div>

            {/* description input start from here */}
            <div style={{ marginBottom: "20px" }}>
              <div className="form-group mb-0 row">
                <label className="col-form-label col-md-2"> Description</label>
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="text"
                      onChange={handleChange}
                      name="description"
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
                    <h3 className="page-title">Hospitals List</h3>
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
                  placeholder={"Seach Hospital"}
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
                              <th>Serial Number</th>
                              <th>Name</th>
                              <th>Address</th>
                              <th>Zip</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentHospitalInfo.map(
                              (singleHospital, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      {(currentPage - 1) * postPerPage +
                                        1 +
                                        index}
                                    </td>
                                    <td>{singleHospital.name}</td>
                                    <td>{singleHospital.address}</td>
                                    <td>{singleHospital.zip_code}</td>
                                    <td>
                                      <div className="actions">
                                        <button
                                          disabled={
                                            !userProfile.role_permissions
                                              .edit
                                          }
                                          className="btn btn-sm bg-success-light mr-2"
                                          onClick={() =>
                                            handleEditClick(singleHospital)
                                          }
                                        >
                                          <i className="fa-solid fa-pen-to-square"></i>{" "}
                                        </button>
                                        <button
                                          disabled={
                                            !userProfile.role_permissions
                                              .delete
                                          }
                                          className="btn btn-sm bg-danger-light"
                                          onClick={() =>
                                            handleDeleteClick(singleHospital.id)
                                          }
                                        >
                                          <i className="fa fa-trash"></i>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
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
                  totalPost={filteredHospital.length}
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
        <HospitalEditModal
          isShow={isEditModalshow}
          handleClose={handleEditModalClose}
          modalTitle={"Hospital Info"}
          hospitalInfo={selectedItem}
          handleChange={handleEditValueChange}
          id={selectedItemId}
          handleEditSubmit={handleEditSubmit}
        />
        {/* <!-- /Edit Modal --> */}
      </div>
    </>
  );
};

export default HospitalAppInput;
