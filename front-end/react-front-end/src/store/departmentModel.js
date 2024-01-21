import { action, thunk } from "easy-peasy";
import apiService from "../api";

const departmentModel = {
    departmentList : [],
    updateDepartmentList : action((state, payload)=>{
        state.departmentList.push(payload)
    }),
    removeDepartmentList : action((state)=>{
        state.departmentList = [];
    }),
    getDepartmentListFromServer : thunk( async (actions, payload)=>{
        const data =  await apiService.getData(payload);
        if(data){actions.removeDepartmentList()}
        data.forEach(element => {
            actions.updateDepartmentList(element);
        });
    })
}


export default departmentModel;