import {action, thunk} from 'easy-peasy';
import apiService from '../api';

const divisionModel = {
    divisionList : [],
    updateDivisionList : action((state, payload)=>{
        state.divisionList.push(payload)
    }),
    getDivisionListFromServer : thunk(async(actions, payload)=>{
        const data =  await apiService.getData(payload);
        data.forEach(element => {
            actions.updateDivisionList(element);
        });
    })
};

export default divisionModel;