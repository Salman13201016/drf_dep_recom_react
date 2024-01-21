import { action, thunk } from "easy-peasy";
import apiService from "../api";

const hospitalCategoryModel = {
  categoryList: [],
  updateCategoryList: action((state, payload) => {
    state.categoryList.push(payload);
  }),
  removeCategoryList: action((state) => {
    state.categoryList = [];
  }),
  getCategoryListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    if(data){actions.removeCategoryList()}
    data.forEach((element) => {
      actions.updateCategoryList(element);
    });
  }),
};

export default hospitalCategoryModel;
