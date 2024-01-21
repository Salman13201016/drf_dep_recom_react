import { action, thunk } from "easy-peasy";
import apiService from "../api";

const stationModel = {
  stationList: [],
  updateStationList: action((state, payload) => {
    state.stationList.push(payload);
  }),
  removeStationList: action((state) => {
    state.stationList = [];
  }),
  getStationFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    if(data){actions.removeStationList()}
    data.forEach((element) => {
      actions.updateStationList(element);
    });
  }),
};

export default stationModel;
