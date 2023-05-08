import { useNavigate, useParams } from "react-router-dom";
import ProductDetailCSS from "./ProductDetail.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callProductDetailAPI } from "../../apis/ProductAPICalls";
import { isLogin } from "../../utils/TokenUtils";

function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.productReducer);
  const params = useParams();
  const productCode = params.productCode;
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    dispatch(callProductDetailAPI({ productCode }));
  }, []);

  /* 구매 수량 변경 시 적용하는 함수 */
  const onChangeAmountHandler = (e) => {
    setAmount(e.target.value);
  };

  /* 구매하기 버튼 클릭시 발생하는 이벤트 */
  const onClickPurchaseHandler = () => {
    // 1. 로그인 상태인지 확인
    if (!isLogin()) {
      alert("구매 전 로그인이 필요합니다.");
      return;
    }

    // 2. 구매 가능 수량 확인
    if (amount > product.productStock) {
      alert("구매 가능 수량을 확인해주세요.");
      return;
    }

    navigate(`/product/${params.productCode}/purchase?amount=${amount}`);
  };

  /* 리뷰보기 버튼 클릭 이벤트 */
  const onClickReviewHandler = () => {
    navigate(`/review/${params.productCode}`);
  };

  return (
    <>
      <div className={ProductDetailCSS.DetailDiv}>
        {product.productCode && (
          <>
            <div className={ProductDetailCSS.imgDiv}>
              <img src={product.productImgUrl} alt={product.productName} />
              <button
                className={ProductDetailCSS.reviewBtn}
                onClick={onClickReviewHandler}
              >
                리뷰보기
              </button>
            </div>
            <div className={ProductDetailCSS.descriptionDiv}>
              <table className={ProductDetailCSS.descriptionTable}>
                <tbody>
                  <tr>
                    <th>상품코드</th>
                    <td>{product.productCode}</td>
                  </tr>
                  <tr>
                    <th>상품명</th>
                    <td>{product.productName}</td>
                  </tr>
                  <tr>
                    <th>상품가격</th>
                    <td>{product.productPrice}</td>
                  </tr>
                  <tr>
                    <th>상품설명</th>
                    <td>{product.productDescription}</td>
                  </tr>
                  <tr>
                    <th>구매가능수량</th>
                    <td>{product.productStock}</td>
                  </tr>
                  <tr>
                    <th>구매수량</th>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={amount}
                        onChange={onChangeAmountHandler}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className={ProductDetailCSS.productBuyBtn}
                onClick={onClickPurchaseHandler}
              >
                구매하기
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
