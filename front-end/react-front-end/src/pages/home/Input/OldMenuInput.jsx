import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import DeleteModal from "../../../components/shared/modal/DeleteModal";
import PaginationComponent from "../../../components/UI/pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import apiService from "../../../api";
import SelectPostPerPage from "../../../components/shared/input/SelectPostPerPage";
import SearchInput from "../../../components/shared/input/SearchInput";
import MenuEditModal from "../../../components/shared/modal/MenuEditModal";

const initialValue = {
  menu_name: "",
  submenu_status: false,
  menu_url: "",
  submenu_name: "",
  submenu_urls: "",
  menu_icon: "",
};
const OldMenuInput = () => {
  const { menu } = useStoreState((state) => state);
  const { menu: menuActions } = useStoreActions((actions) => actions);
  const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));
  const [menuInfo, setMenuInfo] = useState(initialValue);
  const [searchInput, setSearchInput] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(menu.menuList);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedEditItem, setSelectedEditItem] = useState("");
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentMenu = filteredMenu.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const result = menu.menuList.filter((item) => {
      return searchInput.toLowerCase() === ""
        ? item
        : item.menu_name.toLowerCase().includes(searchInput);
    });

    if (result.length) {
      setFilteredMenu(result);
    } else if (!searchInput.length) {
      setFilteredMenu(menu.menuList);
    } else {
      setFilteredMenu([]);
    }
  }, [searchInput, menu.menuList]);

  if (filteredMenu.length) {
    if (Math.ceil(filteredMenu.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  const handleChange = (e) => {
    if (e.target.name == "submenu_status") {
      setMenuInfo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.checked,
        };
      });
    } else {
      setMenuInfo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };
  const handleSubmit = async () => {
    const response = await apiService.postData(
      "http://127.0.0.1:8000/menu_permission/menus/",
      JSON.stringify(menuInfo)
    );
    if (response.statusText == "Created") {
      toast.success("Added Successfully");
      setMenuInfo(initialValue);
      await menuActions.getMenuListFromServer(
        "http://127.0.0.1:8000/menu_permission/menus/"
      );
    } else {
      toast.warn("Something went wrong");
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
      `http://127.0.0.1:8000/menu_permission/menus/${itemId}/`
    );
    if (response.status == 204) {
      toast.warn("Menu has been deleted");
      // Reset selectedItemId and close the modal
      setSelectedItemId(null);
      setIsDeleteModalOpen(false);
      await menuActions.getMenuListFromServer(
        "http://127.0.0.1:8000/menu_permission/menus/"
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

  const handleEditClick = (singleMenu) => {
    setSelectedItemId(singleMenu.id);
    setSelectedEditItem(singleMenu);
    setIsEditModalShow(true);
  };
  const handleEditValueChange = (e) => {
    if (e.target.name == "submenu_status") {
      setSelectedEditItem((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.checked,
        };
      });
    } else {
      setSelectedEditItem((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleConfirmEdit = async () => {
    const response = await apiService.updateData(
      `http://127.0.0.1:8000/menu_permission/menus/${selectedItemId}/`,
      JSON.stringify(selectedEditItem)
    );

    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success("Successfully Updated");
      await menuActions.getMenuListFromServer(
        "http://127.0.0.1:8000/menu_permission/menus/"
      );
    }
  };
  return (
    <div className="card">
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Menu Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          {/* menu name input start */}
          <div className="form-group mb-0 row mb-2">
            <label className="col-form-label col-md-2">Menu Name</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  name="menu_name"
                  className="form-control"
                  type="text"
                  value={menuInfo.menu_name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* menu name input end */}

          {/* menu url input start */}
          <div className="form-group mb-0 row mb-2">
            <label className="col-form-label col-md-2">Menu URL</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  disabled={menuInfo.submenu_status}
                  name="menu_url"
                  className="form-control"
                  type="text"
                  value={menuInfo.menu_url}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* menu url input end */}

          {/* menu icon input start */}
          <div className="form-group mb-0 row mb-2">
            <label className="col-form-label col-md-2">Menu Icon</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  name="menu_icon"
                  className="form-control"
                  type="text"
                  value={menuInfo.menu_icon}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* menu icon input end */}

          {/* submenu status input start */}
          <div className="form-group mb-0 row mb-2">
            <label className="col-form-label col-md-2">Submenu Status</label>
            <div className="col-md-10 mt-2">
              <div className="input-group">
                <input
                  name="submenu_status"
                  onChange={handleChange}
                  type="checkbox"
                  style={{ width: "1em", height: "1em" }}
                />
              </div>
            </div>
          </div>
          {/* submenu status input end */}

          {/* submenu name input start */}

          <div className="form-group mb-0 row mb-2">
            <label className="col-form-label col-md-2">Submenu Name</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  disabled={!menuInfo.submenu_status}
                  name="submenu_name"
                  className="form-control"
                  type="text"
                  value={menuInfo.submenu_name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* submenu name input end */}

          {/* submenu url input start */}

          <div className="form-group mb-0 row mb-2">
            <label className="col-form-label col-md-2">Submenu Url</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  disabled={!menuInfo.submenu_status}
                  name="submenu_urls"
                  className="form-control"
                  type="text"
                  value={menuInfo.submenu_urls}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="input-group-append ml-5">
            <button
              disabled={!userProfile.role_permissions.insert}
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          {/* submenu url input end */}
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
                  <h3 className="page-title">Menu List</h3>
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
                placeholder={"Search Menu"}
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
                            <th>Menu</th>
                            <th>Submenu</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentMenu.map((singleMenu, index) => {
                            return (
                              <tr key={singleMenu.id}>
                                <td>
                                  {(currentPage - 1) * postPerPage + 1 + index}
                                </td>
                                <td>{singleMenu.menu_name}</td>
                                <td>
                                  {singleMenu.submenu_name ? (
                                    singleMenu.submenu_name
                                  ) : (
                                    <p>Not Available</p>
                                  )}
                                </td>
                                <td>
                                  <button
                                    disabled={
                                      !userProfile.role_permissions.edit
                                    }
                                    className="btn btn-sm bg-success-light mr-2 px-3"
                                    onClick={() => handleEditClick(singleMenu)}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                                  </button>
                                  <button
                                    disabled={
                                      !userProfile.role_permissions.delete
                                    }
                                    className="btn btn-sm bg-danger-light px-3"
                                    onClick={() =>
                                      handleDeleteClick(singleMenu.id)
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
                totalPost={filteredMenu.length}
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
      {/* <EditModal
        isShow={isEditModalshow}
        handleClose={handleEditModalClose}
        modalTitle={"Menu Items"}
        editValue={selectedItemName}
        handleChange={handleEditValueChange}
        id={selectedItemId}
        confirmEdit={handleConfirmEdit}
      /> */}
      <MenuEditModal
        isShow={isEditModalshow}
        handleClose={handleEditModalClose}
        modalTitle={"Menu Items"}
        editValue={selectedEditItem}
        handleChange={handleEditValueChange}
        id={selectedItemId}
        confirmEdit={handleConfirmEdit}
      />

      {/* <!-- /Edit Modal --> */}
    </div>
  );
};

export default OldMenuInput;
