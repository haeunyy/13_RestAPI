import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_PRODUCTS = 'product/GET_PRODUCTS';
const GET_PRODUCT = 'product/GET_PRODUCT'

export const { product : { getProducts, getProduct } } = createActions({
    [GET_PRODUCTS] : (res) => res.data,
    [GET_PRODUCT] : (res) => res.data  
}); 

/* 리듀서 */
const productReducer = handleActions(
    {
        [GET_PRODUCTS] : (state, { payload }) => payload,
        [GET_PRODUCT] : (state, { payload }) => payload
    }
, initialState);

export default productReducer;