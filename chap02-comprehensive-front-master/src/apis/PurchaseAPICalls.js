import { getPurchase, postPurchase } from "../modules/PurchaseModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api/v1`;

export const callPurchaseAPI = (form) => {
  const requestURL = `${PRE_URL}/purchase`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(form),
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log("[PurchaseAPICalls] callPurchaseAPI result : ", result);
      dispatch(postPurchase(result));
    }
  };
};

export const callPurchaseListAPI = () => {
  const requestURL = `${PRE_URL}/purchase`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log("[PurchaseAPICalls] callPurchaseListAPI result : ", result);

      dispatch(getPurchase(result));
    }
  };
};
