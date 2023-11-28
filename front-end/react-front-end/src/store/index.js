import {createStore} from 'easy-peasy'
import divisionModel from './divisionModel'




const store = createStore({
    division : divisionModel,
})

export default store;