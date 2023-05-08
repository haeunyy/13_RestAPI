import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_REVIEWS = "review/GET_REVIEWS";
const GET_REVIEW = "review/GET_REVIEW";

export const {
  review: { getReviews, getReivew },
} = createActions({
  [GET_REVIEWS]: (res) => res.data,
  [GET_REVIEW]: (res) => res.data,
});

/* 리듀서 */
const reviewReducer = handleActions(
  {
    [GET_REVIEWS]: (state, { payload }) => payload,
    [GET_REVIEW]: (state, { payload }) => ({ review: payload }), // review라는 키값으로 저장한다.
  },
  initialState
);

export default reviewReducer;
