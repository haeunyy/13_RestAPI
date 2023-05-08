import { useEffect } from "react";
import PaymentCSS from "./Payment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callPurchaseListAPI } from "../../apis/PurchaseAPICalls";

function Payment() {
  /* 컴포넌트가 랜더링 된 직후(useEffect) PurchaseAPICalls의 callPurchaseListAPI() 메소드를 호출한다. 
  state.purchaseReducer에 저장 된 값을 가져와서 Table의 tr 하나당 하나의 구매건을 출력한다. */
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.purchaseReducer);

  useEffect(() => {
    dispatch(callPurchaseListAPI());
  }, []);

  return (
    <div className={PaymentCSS.paymentDiv}>
      <table className={PaymentCSS.paymentTable}>
        <colgroup>
          <col width="20%" />
          <col width="40%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <thead>
          <tr>
            <th>주문일자</th>
            <th>주문 상품 정보</th>
            <th>상품금액(수량)</th>
            <th>리뷰</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((purchase) => (
              <tr key={purchase.orderCode}>
                <td>{purchase.orderDate}</td>
                <td>{purchase.product.productName}</td>
                <td>
                  {purchase.product.productPrice}원 ({purchase.orderAmount}개)
                </td>
                <td>
                  <button className={PaymentCSS.reviewWriteBtn}>
                    리뷰 확인
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payment;
