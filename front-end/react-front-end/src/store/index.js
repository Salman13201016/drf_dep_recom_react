import {createStore} from 'easy-peasy'
import divisionModel from './divisionModel'
import districtModel from './districtModel';
import stationModel from './stationModel';
import hospitalCategoryModel from './hospitalCategoryModel';




const store = createStore({
    division : divisionModel,
    district : districtModel,
    station : stationModel,
    hospitalCategory : hospitalCategoryModel,
})

export default store;