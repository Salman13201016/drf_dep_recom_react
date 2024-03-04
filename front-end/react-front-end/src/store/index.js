import {createStore} from 'easy-peasy'
import divisionModel from './divisionModel'
import districtModel from './districtModel';
import stationModel from './stationModel';
import hospitalCategoryModel from './hospitalCategoryModel';
import departmentModel from './departmentModel';
import diseaseModel from './diseaseModel';
import hospitalInfoModel from './hospitalInfoModel';
import hospitalMapModel from './hospitalMapModel';
import roleModel from './roleModel';
import symptomModel from './symptomModel';
import userModel from './userModel';
import userRoleModel from './userRoleModel';
import profileModel from './profile';
import rolePermissionModel from './rolePermissionModel';
import menuModel from './menuModel';
import menuPermissionModel from './menuPermissionModel';




const store = createStore({
    division : divisionModel,
    district : districtModel,
    station : stationModel,
    hospitalCategory : hospitalCategoryModel,
    hospitalInfo : hospitalInfoModel,
    department : departmentModel,
    disease : diseaseModel,
    hospitalMap : hospitalMapModel,
    role : roleModel,
    users : userModel,
    userRole :  userRoleModel,
    symptom : symptomModel,
    profile : profileModel,
    rolePermission : rolePermissionModel,
    menu : menuModel,
    menuPermission : menuPermissionModel,
})

export default store;