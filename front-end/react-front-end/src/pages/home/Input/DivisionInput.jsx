import { useState } from "react";
import apiService from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import { useStoreState } from "easy-peasy";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import EditModal from "../../../components/shared/modal/EditModal";
import PaginationReact from "../../../components/UI/pagination/Pagination";

const DivisionInput = () => {
  const { divisionList } = useStoreState((state) => state.division);
  const [division, setdivision] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentDivision = divisionList.slice(firstPostIndex, lastPostIndex)
  const notify = () =>
    toast.success("Successfully Added", {
      autoClose: 3000,
    });
  const handleChange = (e) => {
    setdivision(e.target.value);
  };
  const handleSubmit = async () => {
    const jsonData = {
      name: division,
    };
    if (division.length > 0) {
      const res = await apiService.postData(
        "http://127.0.0.1:8000/division/divisions/",
        JSON.stringify(jsonData)
      );
      if (res.status) {
        notify();
        setdivision("");
      }
    } else {
      alert("Please Insert Division");
    }
  };
  const getCurrentPage = (pageNumber)=>{
    setcurrentPage(pageNumber);
  }

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (itemId) => {
    // Perform the actual delete operation with the itemId
    console.log(`Deleting item with ID: ${itemId}`);
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
    setSelectedItemName('');
    setIsEditModalShow(false);
  };

  const handleEditClick = (name, itemId) => {
    setSelectedItemId(itemId);
    setSelectedItemName(name);
    setIsEditModalShow(true);
  };
  const handleEditValueChange = (e)=>{
    setSelectedItemName(e.target.value)
  }


  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Division Data Input</h4>
      </div>
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

      {/* <!-- Page Wrapper --> */}
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
                        {currentDivision.map((singleDivision, index) => {
                          return (
                            <tr key={index}>
                              <td>{singleDivision.id}</td>
                              <td>{singleDivision.name}</td>
                              <td>
                                <div className="actions">
                                  <a
                                    className="btn btn-sm bg-success-light"
                                    onClick={() =>
                                      handleEditClick(
                                        singleDivision.name,
                                        singleDivision.id
                                      )
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
                                      handleDeleteClick(singleDivision.id)
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
            <PaginationReact
              currentPage={currentPage}
              postPerPage={postPerPage}
              totalPost={divisionList.length}
              changePage={getCurrentPage}
            />
          </div>
        </div>
      </div>
      {/* <!-- /Page Wrapper --> */}

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
      />
      {/* <!-- /Edit Modal --> */}
    </div>
  );
};

export default DivisionInput;
