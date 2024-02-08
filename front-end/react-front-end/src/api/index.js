import axios from "axios";

const apiService = {
  getData: async function (url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  postData: async function (url, postData) {
    try {
      const response = await axios.post(url, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.log("Error making POST Request:", error.message);
    }
  },
  signUpPostData: async function (url, postData) {
    try {
      console.log(postData)
      const response = await axios.post(url, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.log(postData)
      return error.response.data.non_field_errors[0];
    }
  },

  postDataAsFormData: async function (url, postData) {
    try {
      const { data } = await axios.post(url, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return error
    }
  },
  updateDataAsFormData: async function (url, postData) {
    try {
      const { data } = await axios.patch(url, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      console.log("Error making POST Request:", error.message);
    }
  },

  updateData: async function (url, postData) {
    try {
      const response = await axios.patch(url, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.log("Error making POST Request:", error.message);
    }
  },
  deleteData: async function (url) {
    try {
      const response = await axios.delete(url);
      return response
    } catch (error) {
      return error;
    }
  },

  getNearestHospital : function(url, params){
    try {
      axios.get(url, {
        params
      })
    } catch (error) {
      return error
    }
  }
};

export default apiService;
