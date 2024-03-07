import { action, thunk } from "easy-peasy";
import apiService from "../api";

const roleModel = {
  roleList: [],
  updateRoleList: action((state, payload) => {
    state.roleList.push(payload);
  }),
  removeRoleList: action((state) => {
    state.roleList = [];
  }),
  getRoleListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    if (data) {
      actions.removeRoleList();
    }
    data.forEach((element) => {
      actions.updateRoleList(element);
    });
  }),
};

export default roleModel;
