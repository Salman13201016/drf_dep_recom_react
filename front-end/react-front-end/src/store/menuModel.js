import { action, thunk } from "easy-peasy";
import apiService from "../api";

const menuModel = {
  menuList: [],
  updateMenuList: action((state, payload) => {
    state.menuList.push(payload);
  }),
  removeMenuList: action((state) => {
    state.menuList = [];
  }),
  getMenuListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    if (data) {
      actions.removeMenuList();
    }
    data.forEach((element) => {
      actions.updateMenuList(element);
    });
  }),
};

export default menuModel;
