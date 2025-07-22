import axios from "axios";
const main_Url = "http://127.0.0.1:8000/";
const Api = {
  async get(url: string) {
    const response = await axios.get(main_Url + url);
    return response.data;
  },
  async post(url: string, params: any) {
    const response = await axios.post(
      main_Url + url,
      params,
    );
    return response.data;
  },
};

export default Api;
