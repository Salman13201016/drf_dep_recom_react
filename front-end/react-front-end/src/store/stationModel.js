import { action, thunk } from "easy-peasy";
import apiService from "../api";

const stationModel = {
  stationList: [],
  updateStationList: action((state, payload) => {
    state.stationList.push(payload);
  }),
  getStationFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    data.forEach((element) => {
      actions.updateStationList(element);
    });
  }),
};

export default stationModel;
