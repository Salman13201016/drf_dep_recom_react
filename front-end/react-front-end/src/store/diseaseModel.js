import { action, thunk } from "easy-peasy";
import apiService from "../api";

const diseaseModel = {
  diseaseList: [],
  updateDiseaseList: action((state, payload) => {
    state.diseaseList.push(payload);
  }),
  removeDiseaseList: action((state) => {
    state.diseaseList = [];
  }),
  getDiseaseListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    if(data){actions.removeDiseaseList()}
    data.forEach((singleDisease) => {
      actions.updateDiseaseList(singleDisease);
    });
  }),
};

export default diseaseModel;
