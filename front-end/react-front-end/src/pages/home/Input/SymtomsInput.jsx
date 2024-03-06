import {useStoreState} from 'easy-peasy'
import { useEffect, useState } from 'react';
import apiService from '../../../api';
import PaginationComponent from '../../../components/UI/pagination/Pagination';
import { ToastContainer, toast } from "react-toastify";
import SelectPostPerPage from '../../../components/shared/input/SelectPostPerPage';
import SearchInput from '../../../components/shared/input/SearchInput';
import DeleteModal from '../../../components/shared/modal/DeleteModal';
import { truncatedText } from '../../../utils/utils';
import SymptomEditModal from '../../../components/shared/modal/SymptomEditModal';

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
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const [symptomInfo, setSymptomInfo] = useState(initalValue);
  const [showDiseaseInJSX, setshowDiseaseInJSX] = useState("");
  const [initialInputNumber, setinitialInputNumber] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const filteredSymptom = symptomFromServer.symptomList.filter((item) => {
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
  const currentSymptom = filteredSymptom.slice(firstPostIndex, lastPostIndex);
  const initalInput = [];
  for (let i = 0; i < initialInputNumber; i++) {
    initalInput.push(`symptom${i+1}`);
  }


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
    if (initialInputNumber <= 5) {
      return;
    } else {
      setinitialInputNumber(initialInputNumber-1)
    }
  }


    useEffect(() => {
      let selectedDisease = [];
      disease.diseaseList.forEach((element) => {

        if (element.department.id == symptomInfo.department) {
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
      // const editedData = {
      //   id: selectedItem.id,
      //   name: selectedItem.name,
      //   division: selectedItem.division.id,
      // };
      // setSelectedItemId(null);
      // const response = await apiService.updateData(
      //   `http://127.0.0.1:8000/district/districts/${selectedItem.id}/`,
      //   JSON.stringify(editedData)
      // );
      // if (response.statusText == "OK") {
      //   toast.success("Successfully Updated");
      //   await getDistrictListFromServer(
      //     "http://127.0.0.1:8000/district/districts/"
      //   );
      // }
      // setIsEditModalShow(false);

      console.log(selectedItem)
    };



  return (
    <div className="card">
      <ToastContainer />
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
            <button
              className="btn btn-primary mr-2"
              type="submit"
              disabled={!userProfile.role_permissions.insert}
            >
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
      {userProfile.role_permissions.view ? (
        <div>
          <div className="content container-fluid">
            {/* <!-- Page Header --> */}
            <div>
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Symptom List</h3>
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
                            <th>Symptom</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentSymptom.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {(currentPage - 1) * postPerPage + 1 + index}
                                </td>
                                <td>
                                  {truncatedText(
                                    `${item.symptom1},${item.symptom2},${item.symptom3},${item.symptom4},${item.symptom5},${item.symptom6},${item.symptom7},${item.symptom8},${item.symptom9},${item.symptom10},${item.symptom11},${item.symptom12},${item.symptom13},${item.symptom14},${item.symptom15}, ${item.symptom16}, ${item.symptom17}`,
                                    60
                                  )}
                                </td>
                                <td>
                                  <button
                                    disabled={
                                      !userProfile.role_permissions.edit
                                    }
                                    className="btn btn-sm bg-success-light px-3 mr-2"
                                    onClick={() => handleEditClick(item)}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>
                                  <button
                                    disabled={
                                      !userProfile.role_permissions.delete
                                    }
                                    className="btn btn-sm bg-danger-light px-3"
                                    onClick={() => handleDeleteClick(item.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
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
                totalPost={filteredSymptom.length}
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

      <SymptomEditModal
        isShow={isEditModalshow}
        handleClose={handleEditModalClose}
        modalTitle={"Symptom Field"}
        editValue={selectedItem}
        handleChange={handleEditValueChange}
        id={selectedItemId}
        confirmEdit={handleConfirmEdit}
      />

      {/* <!-- /Edit Modal --> */}
    </div>
  );
}

export default SymtomsInput