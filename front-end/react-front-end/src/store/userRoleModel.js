import { action, thunk } from "easy-peasy";
import apiService from "../api";

const userRoleModel = {
  userRoleList: [],
  updateUserRoleList: action((state, payload) => {
    state.userRoleList.push(payload);
  }),
  getUserRoleListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    data.forEach((element) => {
      actions.updateUserRoleList(element);
    });
  }),
};

export default userRoleModel;
