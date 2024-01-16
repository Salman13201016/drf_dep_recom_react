import { action, thunk } from "easy-peasy";
import apiService from "../api";

const hospitalMapModel = {
  hospitalMapList: [],
  updateHospitalMapList: action((state, payload) => {
    state.hospitalMapList.push(payload);
  }),
  getHospitalMapListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    data.forEach((element) => {
      actions.updateHospitalMapList(element);
    });
  }),
};

export default hospitalMapModel;
