import { action, thunk } from "easy-peasy";
import apiService from "../api";

const symptomModel = {
  symptomList: [],
  updateSymptomList: action((state, payload) => {
    state.symptomList.push(payload);
  }),
  removeSymptomList: action((state) => {
    state.symptomList = [];
  }),
  getSymptomListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    actions.removeSymptomList();
    data.forEach((element) => {
      actions.updateSymptomList(element);
    });
  }),
};

export default symptomModel;
