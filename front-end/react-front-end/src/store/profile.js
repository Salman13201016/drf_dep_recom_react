import { action } from "easy-peasy";


const profileModel = {
  userProfile: {
    permissions : {edit: true, delete:true, view:true, insert:true}
  },
  updateProfile: action((state, payload) => {
    state.userProfile = payload;
  }),
  removeProfile: action((state) => {
    state.updateProfile = '';
  })
};

export default profileModel;
