import { getReivew, getReviews } from "../modules/ReviewModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api/v1`;

export const callReviewsAPI = ({ productCode, currentPage }) => {
  const requestURL = `${PRE_URL}/reviews/product/${productCode}?page=${currentPage}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL).then((response) => response.json());

    console.log("[ReviewAPICalls] callReviewsAPI result : ", result);

    if (result.status === 200) {
      dispatch(getReviews(result));
    }
  };
};

export const callReviewDetailAPI = ({ reviewCode }) => {
  const requestURL = `${PRE_URL}/reviews/${reviewCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL).then((response) => response.json());

    console.log();

    if (result.status === 200) {
      dispatch(getReivew(result)); // store에 저장할 수 있도록
    }
  };
};
