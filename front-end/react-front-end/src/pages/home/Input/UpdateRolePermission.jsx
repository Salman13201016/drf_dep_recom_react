import { useState } from "react";
import { useStoreState } from "easy-peasy";
import apiService from "../../../api";
import { ToastContainer, toast } from "react-toastify";

const initalValue = {
  role: null,
  view: false,
  insert: false,
  edit: false,
  delete: false,
};
const UpdateRolePermission = () => {
  const { role } = useStoreState((state) => state);
  const [rolePermissionInput, setRolePermissionInput] = useState(initalValue);

  const handleRolePermission = (e) => {
    if (e.target.name == "role") {
      setRolePermissionInput((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    } else {
      setRolePermissionInput((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.checked,
        };
      });
    }
  };

  const handleSubmit = async () => {
    // console.log(JSON.stringify(rolePermissionInput))
    if (rolePermissionInput.role) {
      const response = await apiService.updateData(
        `http://127.0.0.1:8000/role/crudOperation/${rolePermissionInput.role}`,
        JSON.stringify(rolePermissionInput)
      );
      if (response.status == 201) {
        toast.success('Updated Successfully')
      }
    }
  };

  return (
    <div className="card">
        <ToastContainer />
      <div className="card-body">
        <div className="form-group row">
          <label className="col-form-label col-md-2">Select Role</label>
          <div className="col-md-10">
            <select
              className="form-control"
              onChange={handleRolePermission}
              name="role"
              required
            >
              <option value="">Select</option>
              {role.roleList.map((singleRole) => {
                return (
                  <option key={singleRole.id} value={singleRole.id}>
                    {singleRole.role}
                  </option>
                );
              })}
            </select>
            <table className="datatable table table-hover table-center mb-0">
              <thead>
                <tr>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>View</th>
                  <th>Insert</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      name="edit"
                      value={"edit"}
                      onChange={handleRolePermission}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      name="delete"
                      value={"delete"}
                      onChange={handleRolePermission}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      name="view"
                      value={"view"}
                      onChange={handleRolePermission}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      name="insert"
                      value={"insert"}
                      onChange={handleRolePermission}
                      type="checkbox"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="input-group-append mt-2">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRolePermission;