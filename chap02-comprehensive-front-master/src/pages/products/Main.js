import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callProductCategoriesListAPI, callProductListAPI, callProductSearchListAPI } from "../../apis/ProductAPICalls";
import ProductList from "../../components/lists/ProductList";
import PagingBar from "../../components/common/PagingBar";
import { useParams, useSearchParams } from "react-router-dom";

function Main() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer);
    const productList = products.data;
    const pageInfo = products.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);
    /* 카테고리별 요청시 사용할 값 */
    const params = useParams();
    const categoryCode = params.categoryCode;
    /* 검색어 요청시 사용할 값 */
    const [searchParams] = useSearchParams();
    const search = searchParams.get('value');

    useEffect(
        () => {
            if(categoryCode) {
                /* 카테고리별 음식에 대한 요청 */
                dispatch(callProductCategoriesListAPI({ categoryCode, currentPage }));
            } else if(search) {
                /* 검색어에 해당하는 음식에 대한 요청 */
                dispatch(callProductSearchListAPI({ search, currentPage }));
            } else {
                /* 모든 음식에 대한 요청 */
                dispatch(callProductListAPI({ currentPage }));
            }
            
        },
        [currentPage, categoryCode, search]
    );

    return (
        <>  
            <div>
                { productList && <ProductList productList={productList} /> }
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </>
    );
}

export default Main;