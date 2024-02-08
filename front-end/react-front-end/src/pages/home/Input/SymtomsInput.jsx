import {useStoreState} from 'easy-peasy'
import { useEffect, useState } from 'react';
import apiService from '../../../api';
import PaginationComponent from '../../../components/UI/pagination/Pagination';
import { ToastContainer, toast } from "react-toastify";
import SelectPostPerPage from '../../../components/shared/input/SelectPostPerPage';
import SearchInput from '../../../components/shared/input/SearchInput';
import DeleteModal from '../../../components/shared/modal/DeleteModal';
import EditModal from '../../../components/shared/modal/EditModal';

const initalValue = {
  department: "",
  disease: "",
  symptom1: "",
  symptom2: "",
  symptom3: "",
  symptom4: "",
  symptom5: "",
  symptom6: "",
  symptom7: "",
  symptom8: "",
  symptom9: "",
  symptom10: "",
  symptom11: "",
  symptom12: "",
  symptom13: "",
  symptom14: "",
  symptom15: "",
  symptom16: "",
  symptom17: "",
};

const SymtomsInput = () => {
  const { department, disease, symptom: symptomFromServer } = useStoreState((state) => state);
  const [symptomInfo, setSymptomInfo] = useState(initalValue);
  const [showDiseaseInJSX, setshowDiseaseInJSX] = useState("");
  const [initialInputNumber, setinitialInputNumber] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const filteredDistrict = symptomFromServer.symptomList.filter((item) => {
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
  const initalInput = [];
  for (let i = 0; i < initialInputNumber; i++) {
    initalInput.push(`symptom${i+1}`);
  }

  console.log(symptomFromServer.symptomList);

  const handleChange = (e) =>{
    setSymptomInfo((prev)=>{
      return{
        ...prev,
        [e.target.name]: e.target.value
      }
    })

  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await apiService.postData('http://127.0.0.1:8000/symptoms/symptom/', JSON.stringify(symptomInfo))
  console.log(response)
  if(response.status == 201){
    console.log('successfully added');
    setSymptomInfo(initalValue)
  }
  }
  const handleAddMore = () =>{
    if (initialInputNumber >= 17) {
      return;
    } else {
      setinitialInputNumber(initialInputNumber+1)
    }
  }
  const handleReduce = () =>{
    if (initialInputNumber <= 1) {
      return;
    } else {
      setinitialInputNumber(initialInputNumber-1)
    }
  }

    useEffect(() => {
      let selectedDisease = [];
      disease.diseaseList.forEach((element) => {
        if (element.department == symptomInfo.department) {
          selectedDisease.push(element);
        }
      });
      setshowDiseaseInJSX(selectedDisease);
      selectedDisease = [];

      if (!showDiseaseInJSX.length > 0) {
        setSymptomInfo((prev) => {
          return {
            ...prev,
            disease: "",
          };
        });
      }
    }, [
      disease.diseaseList,
      showDiseaseInJSX.length,
      symptomInfo.department,
    ]);

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
      <div className="card-header">
        <h4 className="card-title">Symptom Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#" onSubmit={handleSubmit}>
          {/* department start from here */}
          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Department</label>
            <div className="col-md-10">
              <select
                className="form-control"
                onChange={handleChange}
                name="department"
                required
              >
                <option value="">Select</option>
                {department.departmentList.map((singleDepartment) => {
                  return (
                    <option
                      key={singleDepartment.id}
                      value={singleDepartment.id}
                    >
                      {singleDepartment.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* disease start from here */}
          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Disease</label>
            {showDiseaseInJSX.length ? (
              <div className="col-md-10">
                <select
                  className="form-control"
                  onChange={handleChange}
                  name="disease"
                  required
                >
                  <option value="">Select</option>
                  {showDiseaseInJSX.map((singleDisease) => {
                    return (
                      <option key={singleDisease.id} value={singleDisease.id}>
                        {singleDisease.name}
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
                  name="disease"
                  required
                >
                  <option value="">Disease is not available</option>
                </select>
              </div>
            )}
          </div>

          {/* symptom start from here */}
          <div>
            {initalInput.map((singleInput, index) => {
              return (
                <div className="form-group mb-2 row" key={index}>
                  <label className="col-form-label col-md-2">
                    {`Symptom ${index + 1}`}
                  </label>
                  <div className="col-md-10">
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="text"
                        value={symptomInfo.singleInput}
                        onChange={handleChange}
                        name={singleInput}
                        required
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* button start from here */}
          <div className="input-group-append d-flex align-items-center justify-content-center">
            <button className="btn btn-primary mr-2" type="submit">
              Submit
            </button>
            <button
              className="btn btn-secondary mr-2"
              type="button"
              onClick={handleAddMore}
            >
              +
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleReduce}
            >
              -
            </button>
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
}

export default SymtomsInput