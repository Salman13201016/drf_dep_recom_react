import { useStoreState, useStoreActions } from "easy-peasy";
import { useState, useEffect } from "react";
import apiService from '../../../api/index'
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import HospitalEditModal from "../../../components/shared/modal/HospitalEditModal";
import { toast, ToastContainer } from "react-toastify";
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
    const currentHospitalInfo = hospitalInfoFromServer.hospitalInfoList.slice(
      firstPostIndex,
      lastPostIndex
    );

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
            {showDistrictInJSX.length ? (
              <div
                style={{
                  display: hospitalInfo.division.length > 0 ? "block" : "none",
                  marginBottom: "20px",
                }}
              >
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
                  <p>
                    {" "}
                    District May Not Be Available or Please Select Division
                  </p>
                )}
              </div>
            ) : (
              <p>Please Select Divison Above</p>
            )}

            {/* station input start from here */}
            {showStationInJSX.length ? (
              <div className="form-group row">
                <label className="col-form-label col-md-2">
                  Select Station
                </label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="station"
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
              </div>
            ) : (
              <p>Please Select District Above</p>
            )}

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
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* category input start from here */}
            <div className="form-group row">
              <label className="col-form-label col-md-2">Select Category</label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  onChange={handleChange}
                  name="hos_type"
                >
                  <option value="">Select</option>
                  {hospitalCategory.categoryList.map((singleCategory) => {
                    return (
                      <option key={singleCategory.id} value={singleCategory.id}>
                        {singleCategory.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* <div className="form-group row">
              <label className="col-form-label col-md-2">
                Hospital Category
              </label>
              <div className="col-md-10">
                {hospitalCategory.categoryList.map((category, index) => {
                  return (
                    <div className="radio" key={index}>
                      <label>
                        <input
                          type="radio"
                          name="hos_type"
                          value={category.id}
                          onChange={handleChange}
                        />{" "}
                        {category.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div> */}

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
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="submit"
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
                  <h3 className="page-title">Hospitals List</h3>
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
                            <th>Address</th>
                            <th>Zip</th>
                            <th>Update</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentHospitalInfo.map((singleHospital, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {(currentPage - 1) * postPerPage + 1 + index}
                                </td>
                                <td>{singleHospital.name}</td>
                                <td>{singleHospital.address}</td>
                                <td>{singleHospital.zip_code}</td>
                                <td>
                                  <div className="actions">
                                    <a
                                      className="btn btn-sm bg-success-light"
                                      onClick={() =>
                                        handleEditClick(singleHospital)
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
                                        handleDeleteClick(singleHospital.id)
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
                totalPost={hospitalInfoFromServer.hospitalInfoList.length}
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