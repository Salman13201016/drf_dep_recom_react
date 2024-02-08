import { action, thunk } from "easy-peasy";
import apiService from "../api";

const hospitalInfoModel = {
  hospitalInfoList: [],
  updateHospitalInfoList: action((state, payload) => {
    state.hospitalInfoList.push(payload);
  }),
  removeHospitalInfoList: action((state) => {
    state.hospitalInfoList = [];
  }),
  getHospitalInfoFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    if(data){actions.removeHospitalInfoList()}
    data.forEach((singleHospital) => {
      actions.updateHospitalInfoList(singleHospital);
    });
  }),
};

export default hospitalInfoModel;
