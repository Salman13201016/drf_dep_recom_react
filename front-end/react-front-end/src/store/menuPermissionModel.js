import { action, thunk } from "easy-peasy";
import apiService from "../api";

const menuPermissionModel = {
  menuPermissionList: [],
  updateMenuPermissionList: action((state, payload) => {
    state.menuPermissionList.push(payload);
  }),
  removeMenuPermissiontList: action((state) => {
    state.menuPermissionList = [];
  }),
  getMenuPermissionListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    if (data) {
      actions.removeMenuPermissiontList();
    }
    data.forEach((element) => {
      actions.updateMenuPermissionList(element);
    });
  }),
};

export default menuPermissionModel;
