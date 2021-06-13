import axios, {validateResponseCode} from "./config";

export const getFileExtension = (path) =>
  path.slice(((path.lastIndexOf(".") - 1) >>> 0) + 2);

export const updateUserInfo = async (data) => {
  try {
    let response = await axios.put("/user", data);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getMyInfo = async () => {
  try {
    let response = await axios.get(`/user/info`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else return false;
  } catch (error) {
    throw error;
  }
};

export const getTests = async () => {
  try {
    let response = await axios.get(`/user/tests`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const submitTest = async (hospitalId) => {
  try {
    const url = `/user/submitTest/${hospitalId}`;
    let response = await axios.post(url);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const uploadXray = async (testId, body) => {
  try {
    const url = `/user/uploadXray/${testId}`;
    let response = await axios.put(url, body);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
// export const submitTest = async (path,hospitalId, token) => {
//   try {
//     let fileExtension = getFileExtension(path);
//     console.log("Uploading from ", path);
//     const url = `/user/submitTest/${hospitalId}` ;
//     const uploadData = [
//       {
//         name: "mediaContent",
//         filename: path,
//         type: "image/" + fileExtension,
//         data: RNFetchBlob.wrap(path),
//       },
//     ];
//     let response = await RNFetchBlob.fetch(
//       "PUT",
//       rootURL + url,
//       {
//         Authorization: "Bearer " + token,
//         "Content-Type": "multipart/form-data",
//       },
//       uploadData,
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (e) {
//     console.log("error", e);
//     return false;
//   }
// };
