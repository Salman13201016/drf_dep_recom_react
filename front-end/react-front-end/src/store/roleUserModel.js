import { action, thunk } from "easy-peasy";
import apiService from "../api";

const roleUserModel = {
  roleUserList: [],
  updateRoleUserList: action((state, payload) => {
    state.roleUserList.push(payload);
  }),
  getRoleUserListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    data.forEach((element) => {
      actions.updateRoleUserList(element);
    });
  }),
};

export default roleUserModel;
