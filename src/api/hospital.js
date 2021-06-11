import axios, { validateResponseCode } from "./config";

export const getHospitals = async (query) => {
  try {
    let response = await axios.get(`/hospital/list`, { ...query });
    if (validateResponseCode(response.status)) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
