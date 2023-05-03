import { useParams } from "react-router-dom";
import ProductDetailCSS from './ProductDetail.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callProductDetailAPI } from "../../apis/ProductAPICalls";

function ProductDetail() {

    const dispatch = useDispatch();
    const product = useSelector(state => state.productReducer);
    const params = useParams();
    const productCode = params.productCode;
    console.log('product : ', product);

    useEffect(
        () => {
            dispatch(callProductDetailAPI({ productCode }));
        },
        []
    );

    return (
        <>
            <div className={ ProductDetailCSS.DetailDiv }>
                { product.productCode && 
                <>
                    <div className={ ProductDetailCSS.imgDiv }>
                        <img src={ product.productImgUrl } alt={ product.productName }/>
                        <button
                            className={ProductDetailCSS.reviewBtn }
                        >
                            리뷰보기
                        </button>
                    </div>
                    <div className={ ProductDetailCSS.descriptionDiv }>
                        <table className={ ProductDetailCSS.descriptionTable }>
                            <tbody>
                                <tr>
                                    <th>상품코드</th>
                                    <td>{ product.productCode }</td>
                                </tr>
                                <tr>
                                    <th>상품명</th>
                                    <td>{ product.productName }</td>
                                </tr>
                                <tr>
                                    <th>상품가격</th>
                                    <td>{ product.productPrice }</td>
                                </tr>
                                <tr>
                                    <th>상품설명</th>
                                    <td>{ product.productDescription }</td>
                                </tr>    
                                <tr>
                                    <th>구매가능수량</th>
                                    <td>{ product.productStock }</td>
                                </tr>
                                <tr>
                                    <th>구매수량</th>
                                    <td>
                                        <input type="number"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            className={ ProductDetailCSS.productBuyBtn }
                        >
                            구매하기
                        </button>
                    </div>
                </>
                }
            </div>
        </>
    );
}

export default ProductDetail;