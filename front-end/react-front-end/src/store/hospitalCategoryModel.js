import { action, thunk } from "easy-peasy";
import apiService from "../api";

const hospitalCategoryModel = {
  categoryList: [],
  updateCategoryList: action((state, payload) => {
    state.categoryList.push(payload);
  }),
  getCategoryListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    data.forEach((element) => {
      actions.updateCategoryList(element.name);
    });
  }),
};

export default hospitalCategoryModel;
