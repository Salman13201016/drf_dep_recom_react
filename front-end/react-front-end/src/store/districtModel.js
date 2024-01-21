import { action, thunk } from "easy-peasy";
import apiService from "../api";

const districtModel = {
  districtList: [],
  updateDistrictList: action((state, payload) => {
    state.districtList.push(payload);
  }),
  removeDistrictList: action((state) => {
    state.districtList = [];
  }),
  getDistrictListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    actions.removeDistrictList();
    data.forEach((element) => {
    actions.updateDistrictList(element)
    });
  }),
};

export default districtModel;
