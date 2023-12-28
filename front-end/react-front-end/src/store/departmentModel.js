import { action, thunk } from "easy-peasy";
import apiService from "../api";

const departmentModel = {
    departmentList : [],
    updateDepartmentList : action((state, payload)=>{
        state.departmentList.push(payload)
    }),
    getDepartmentListFromServer : thunk( async (actions, payload)=>{
        const data =  await apiService.getData(payload);
        data.forEach(element => {
            actions.updateDepartmentList(element);
        });
    })
}


export default departmentModel;