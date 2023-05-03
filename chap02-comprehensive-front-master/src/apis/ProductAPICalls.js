import { getProduct, getProducts, postProduct } from "../modules/ProductModule";

/* React App에서 .env를 사용할 때는 REACT_APP 접두어가 필요^^;; */
const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api/v1`;

export const callProductListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/products?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ProductAPICalls] : callProductListAPI result : ', result);
            dispatch(getProducts(result));
        }
    }
}

export const callProductCategoriesListAPI = ({ categoryCode, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/products/categories/${categoryCode}?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[ProductAPICalls] callProductCategoriesListAPI result : ", result);
            dispatch(getProducts(result));
        }
    }
}

export const callProductSearchListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/products/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[ProductAPICalls] callProductSearchListAPI result : ", result);
            dispatch(getProducts(result));
        }
    }
}

export const callProductDetailAPI = ({ productCode }) => {

    const requestURL = `${PRE_URL}/products/${productCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[ProductAPICalls] callProductDetailAPI result : ", result);
            dispatch(getProduct(result));
        }
    }
}

export const callProductListForAdminAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/products-management?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ProductAPICalls] : callProductListForAdminAPI result : ', result);
            dispatch(getProducts(result));
        }
    }
}

export const callProductRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/products`;
  
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ProductAPICalls] : callProductRegistAPI result : ', result);
            dispatch(postProduct(result));
        }
    }
}

export const callProductDetailForAdminAPI = ({ productCode }) => {

    const requestURL = `${PRE_URL}/products-management/${productCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[ProductAPICalls] callProductDetailForAdminAPI result : ", result);
            dispatch(getProduct(result));
        }
    }
}