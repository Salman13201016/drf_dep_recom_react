import { action, thunk } from "easy-peasy";
import apiService from "../api";

const rolePermissionModel = {
  rolePermissionList: [],
  updateRolePermissionList: action((state, payload) => {
    state.rolePermissionList.push(payload);
  }),
  removeRolePermissionList: action((state) => {
    state.rolePermissionList = [];
  }),
  getRolePermissionListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    actions.removeRolePermissionList();
    data.forEach((element) => {
      actions.updateRolePermissionList(element);
    });
  }),
};

export default rolePermissionModel;
