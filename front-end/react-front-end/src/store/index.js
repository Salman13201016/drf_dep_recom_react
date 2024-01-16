import {createStore} from 'easy-peasy'
import divisionModel from './divisionModel'
import districtModel from './districtModel';
import stationModel from './stationModel';
import hospitalCategoryModel from './hospitalCategoryModel';
import departmentModel from './departmentModel';
import diseaseModel from './diseaseModel';
import hospitalInfoModel from './hospitalInfoModel';
import hospitalMapModel from './hospitalMapModel';




const store = createStore({
    division : divisionModel,
    district : districtModel,
    station : stationModel,
    hospitalCategory : hospitalCategoryModel,
    hospitalInfo : hospitalInfoModel,
    department : departmentModel,
    disease : diseaseModel,
    hospitalMap : hospitalMapModel,
})

export default store;