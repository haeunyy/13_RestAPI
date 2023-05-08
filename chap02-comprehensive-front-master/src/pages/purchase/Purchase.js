import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { callProductDetailAPI } from "../../apis/ProductAPICalls";
import PurchaseCSS from "./Purchase.module.css";
import { getMemberId } from "../../utils/TokenUtils";
import { callPurchaseAPI } from "../../apis/PurchaseAPICalls";

function Purchase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.productReducer);
  const { regist } = useSelector((state) => state.purchaseReducer);
  const { productCode } = useParams();
  const [params] = useSearchParams();
  const amount = params.get("amount");
  const [form, setForm] = useState({
    product: { productCode },
    orderAmount: parseInt(amount),
  });

  /* 해당 상품에 대한 조회 */
  useEffect(() => {
    dispatch(callProductDetailAPI({ productCode }));
  }, []);

  /* 서버 api 통신이 성공하면 받은 객체를 regist 라는 키 값으로 저장한다. 
    useEffect에서 해당 값이 변화함이 감지 되면 200번 코드임을 확인한 뒤 alert('결제 정보 페이지로 이동합니다') 를 띄운다 */
  useEffect(() => {
    if (regist?.status === 200) {
      alert("결제 정보 페이지로 이동합니다.");
      navigate("/mypage/payment", { replace: true });
    }
  }, [regist]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* 구매하기 버튼 이벤트 */
  const onClickPurchaseHandler = () => {
    if (
      !form.orderPhone ||
      !form.orderEmail ||
      !form.orderReceiver ||
      !form.orderAddress
    ) {
      alert("정보를 모두 입력해주세요");
      return;
    }

    /* PurchaseAPICalls의 callPurchaseAPI(form)을 호출하고 반환 받은 함수를 dispatch로 전달 */
    dispatch(callPurchaseAPI(form));
  };

  return (
    <div className={PurchaseCSS.purchaseDiv}>
      <div className={PurchaseCSS.purchasInfoDiv}>
        <h3>주문자 정보</h3>
        <input
          name="orderMemberId"
          placeholder="주문자 아이디"
          autoComplete="off"
          value={getMemberId()}
          readOnly={true}
          className={PurchaseCSS.purchaseInput}
        />
        <input
          name="orderPhone"
          placeholder="핸드폰번호"
          autoComplete="off"
          onChange={onChangeHandler}
          className={PurchaseCSS.purchaseInput}
        />
        <input
          placeholder="이메일주소"
          name="orderEmail"
          autoComplete="off"
          onChange={onChangeHandler}
          className={PurchaseCSS.purchaseInput}
        />
        <h3>배송 정보</h3>
        <input
          placeholder="받는사람"
          name="orderReceiver"
          autoComplete="off"
          onChange={onChangeHandler}
          className={PurchaseCSS.purchaseInput}
        />
        <input
          placeholder="배송정보"
          name="orderAddress"
          autoComplete="off"
          onChange={onChangeHandler}
          className={PurchaseCSS.purchaseInput}
        />
      </div>
      <div className={PurchaseCSS.purchasInfoDiv}>
        <h3>결제 정보</h3>
        <table>
          <colgroup>
            <col width="25%" />
            <col width="75%" />
          </colgroup>
          <tbody>
            <tr>
              <th>상품명</th>
              <td>{product?.productName}</td>
            </tr>
            <tr>
              <th>상품갯수</th>
              <td>{amount}</td>
            </tr>
            <tr>
              <th>결제금액</th>
              <td>{amount * (product?.productPrice || 0)}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button onClick={onClickPurchaseHandler}>구매하기</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Purchase;
