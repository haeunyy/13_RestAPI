import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callProductDetailForAdminAPI } from "../../apis/ProductAPICalls";

function ProductUpdate() {

    const { productCode } = useParams(); 
    const dispatch = useDispatch();
    const data = useSelector(state => state.productReducer);
    console.log('data : ', data);

    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(
        () => {
            dispatch(callProductDetailForAdminAPI({productCode}));
        },
        []
    );

    return (
        <>상품 상세 및 수정</>
    );
}

export default ProductUpdate;