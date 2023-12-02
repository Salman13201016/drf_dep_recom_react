import axios from "axios";

const apiService = {
  getData: async function (url) {
    const { data } = await axios.get(url);
    return data;
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
};

export default apiService;
