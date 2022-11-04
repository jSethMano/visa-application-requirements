import Axios from "axios";

export async function apiCall(
  url,
  method,
  data,
  headers,
  withCredentials = false,
  params
) {
  let response;
  try {
    let resp = await Axios({
      url,
      method,
      data,
      headers,
      withCredentials,
      params
    });

    if (resp) {
      response = {
        success: true,
        status: resp.status,
        data: resp.data
      };
    }
  } catch (err) {
    if (err.response) {
      response = {
        success: false,
        data: err.response
      };
    } else if (err.request) {
      response = {
        success: false,
        data: "Please check your connection.",
        requestError: true
      };
    } else {
      response = {
        success: false,
        data: err.message
      };
    }
  }

  return response;
}
