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
      const { data } = await axios.post(url, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      console.log("Error making POST Request:", error.message);
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
      console.log("Error making POST Request:", error.message);
    }
  },
};

export default apiService;
