import { action, thunk } from "easy-peasy";
import apiService from "../api";

const hospitalInfoodel = {
  hospitalInfoList: [],
  updateHospitalInfoList: action((state, payload) => {
    state.hospitalInfoList.push(payload);
  }),
  getHospitalInfoFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    data.forEach((singleHospital) => {
      actions.updateHospitalInfoList(singleHospital);
    });
  }),
};

export default hospitalInfoodel;
