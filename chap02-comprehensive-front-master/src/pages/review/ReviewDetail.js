import { useEffect } from "react";
import ReviewDetailCSS from "./ReviewDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { callReviewDetailAPI } from "../../apis/ReviewAPICalls";
import { useDispatch, useSelector } from "react-redux";

function ReviewDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reviewCode } = useParams();
  const { review } = useSelector((state) => state.reviewReducer); // review 라는 키값으로 꺼내온다.

  /* 1. url에서 전달 된 reviewCode를 가져온다.
  2. useEffect에서 callReviewDetailAPI({reviewCode})를 호출하여 반환 받은 값을 넣어 dispatch를 호출한다.
  3. callReviewDetailAPI에서는 조회 된 리뷰를 review라는 key 값으로 store에 저장한다. 
  4. ReviewDetail 에서 store에 저장 된 review 값을 읽어와 화면에 랜더링 한다. 
  */

  useEffect(() => {
    dispatch(callReviewDetailAPI({ reviewCode }));
  }, [reviewCode]);

  return (
    <>
      <div className={ReviewDetailCSS.reviewDetailtableDiv}>
        <table className={ReviewDetailCSS.reviewDetailtableCss}>
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <tbody>
            {review && (
              <>
                <tr>
                  <th>제목</th>
                  <td>{review.reviewTitle}</td>
                </tr>
                <tr>
                  <th>작성자</th>
                  <td>{review.reviewer.memberName}</td>
                </tr>
                <tr>
                  <th>작성일</th>
                  <td>{review.reviewCreateDate}</td>
                </tr>
                <tr>
                  <td colSpan={2}>{review.reviewContent}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className={ReviewDetailCSS.buttonDivCss}>
        <button
          className={ReviewDetailCSS.backBtn}
          onClick={() => navigate(-1)}
        >
          돌아가기
        </button>
      </div>
    </>
  );
}

export default ReviewDetail;
