import {action} from 'easy-peasy';
import apiService from '../api';
const initalValue = ['Barishal', 'Chattogram', 'Dhaka', 'Khulna', 'Rajshahi', 'Rangpur', 'Mymensingh', 'Sylhet'];
const divisionModel = {
    divisionList : [...initalValue],
    getDivisionListFromServer : action((state, payload)=>{
        state.divisionList = apiService.getData(payload);
    })
};

export default divisionModel;