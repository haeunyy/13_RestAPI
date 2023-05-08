import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_PURCHASE = "purchase/GET_PURCHASE";
const POST_PURCHASE = "purchase/POST_PURCHASE";

export const {
  purchase: { getPurchase, postPurchase },
} = createActions({
  [GET_PURCHASE]: (res) => res,
  [POST_PURCHASE]: (res) => res,
});

/* 리듀서 */
const purchaseReducer = handleActions(
  {
    [GET_PURCHASE]: (state, { payload }) => payload,
    [POST_PURCHASE]: (state, { payload }) => ({ regist: payload }),
  },
  initialState
);

export default purchaseReducer;
