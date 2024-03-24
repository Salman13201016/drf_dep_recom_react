import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import apiService from "../../../api";
import { ToastContainer, toast } from "react-toastify";

const initialInput = {
  submenu_name: "",
  submenu_url: "",
  menu: "",
};
const SubmenuInput = () => {
    const { menu } = useStoreState((state) => state);
    const {menu:menuActions} = useStoreActions((actions)=>actions)
    const [subMenuInfo, setSubMenuInfo] = useState(initialInput);
    const userProfile = JSON.parse(sessionStorage.getItem("loginInfo"));

    const handleChange = (e) =>{
        setSubMenuInfo((prev)=>{
            return {
                ...prev,
                [e.target.name]:e.target.value,
            }
        })
    }

    const handleSubmit = async () =>{
        const response = await apiService.postData(
          "http://127.0.0.1:8000/menu_permission/submenus/create/",
          JSON.stringify(subMenuInfo)
        );
        if(response.status == 201){
            toast.success('Successfully Added');
            menuActions.getMenuListFromServer(
              "http://127.0.0.1:8000/menu_permission/menus/"
            );
            setSubMenuInfo(initialInput);
        }else{
            toast.warn('Something Went Wrong')
        }

    }

  return (
    <div>
      <ToastContainer />
      <div className="card-header">
        <h4 className="card-title">Sub Menu Data Input</h4>
      </div>
      <div className="card-body">
        <form action="#">
          {/* menu input start */}
          <div className="form-group row">
            <label className="col-form-label col-md-2">Select Menu</label>
            <div className="col-md-10">
              <select
                className="form-control"
                onChange={handleChange}
                name="menu"
                required
              >
                <option value="">Select</option>
                {menu.menuList.map((singleMenu) => {
                  return (
                    <option key={singleMenu.id} value={singleMenu.id}>
                      {singleMenu.menu_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* menu name input end */}

          {/* submenu name input start */}
          <div className="form-group mb-0 row mb-2">
            <label className="col-form-label col-md-2">Submenu Name</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  name="submenu_name"
                  className="form-control"
                  type="text"
                  value={subMenuInfo.submenu_name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* submenu name input end */}

          {/* submenu url input start */}
          <div className="form-group mb-0 row mb-2">
            <label className="col-form-label col-md-2">Submenu URL</label>
            <div className="col-md-10">
              <div className="input-group">
                <input
                  disabled
                  name="submenu_url"
                  className="form-control"
                  type="text"
                  value={subMenuInfo.submenu_url}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group-append mt-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                  disabled={!userProfile.role_permissions.insert}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* submenu url input end */}
        </form>
      </div>
      <hr style={{ background: "black" }} />
    </div>
  );
}

export default SubmenuInput