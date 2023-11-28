import axios from 'axios'


const apiService = {
    getData : function(url){
        const {data} = axios.get(url);
        return data;
    }
}


export default apiService
