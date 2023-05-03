import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_PRODUCTS = 'product/GET_PRODUCTS';
const GET_PRODUCT = 'product/GET_PRODUCT'
const POST_PRODUCT = 'product/POST_PRODUCT';

export const { product : { getProducts, getProduct, postProduct } } = createActions({
    [GET_PRODUCTS] : res => res.data,
    [GET_PRODUCT] : res => res.data,
    [POST_PRODUCT] : res => res  
}); 

/* 리듀서 */
const productReducer = handleActions(
    {
        [GET_PRODUCTS] : (state, { payload }) => payload,
        [GET_PRODUCT] : (state, { payload }) => payload,
        [POST_PRODUCT] : (state, { payload }) => ({ regist : payload })
    }
, initialState);

export default productReducer;