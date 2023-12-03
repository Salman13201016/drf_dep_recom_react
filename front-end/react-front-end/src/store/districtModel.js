import { action, thunk } from "easy-peasy";
import apiService from "../api";

const districtModel = {
  districtList: [],
  updateDistrictList: action((state, payload) => {
    state.districtList.push(payload);
  }),
  getDistrictListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    data.forEach((element) => {
    actions.updateDistrictList(element.name)
    });
  }),
};

export default districtModel;
