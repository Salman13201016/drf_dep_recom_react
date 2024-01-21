import {action, thunk} from 'easy-peasy';
import apiService from '../api';

const divisionModel = {
    divisionList : [],
    updateDivisionList : action((state, payload)=>{
        state.divisionList.push(payload)
    }),
    removeDivisionList : action((state)=>{
        state.divisionList = [];
    }),
    getDivisionListFromServer : thunk(async(actions, payload)=>{
        const data =  await apiService.getData(payload);
        actions.removeDivisionList();
        data.forEach(element => {
            actions.updateDivisionList(element);
        });
    })
};

export default divisionModel;