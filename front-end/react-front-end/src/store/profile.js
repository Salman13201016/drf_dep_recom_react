import { action } from "easy-peasy";


const profileModel = {
  userProfile: {
    role_permissions: { edit: false, delete: false, view: false, insert: false },
  },
  updateProfile: action((state, payload) => {
    state.userProfile = payload;
  }),
  removeProfile: action((state) => {
    state.updateProfile = "";
  }),
};

export default profileModel;
