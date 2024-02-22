import { action, thunk } from "easy-peasy";
import apiService from "../api";

const userModel = {
  userList: [],
  updateUserList: action((state, payload) => {
    state.userList.push(payload);
  }),
  getUserListFromServer: thunk(async (actions, payload) => {
    const data = await apiService.getData(payload);
    data.forEach((element) => {
      actions.updateUserList(element);
    });
  }),
};

export default userModel;
