import { useNavigate, useParams } from "react-router-dom";
import ReviewCSS from "./Review.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReviewsAPI } from "../../apis/ReviewAPICalls";
import PagingBar from "../../components/common/PagingBar";

function Review() {
  const { productCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, pageInfo } = useSelector((state) => state.reviewReducer);

  useEffect(() => {
    dispatch(callReviewsAPI({ productCode, currentPage }));
  }, [currentPage]);

  const onClickTableTr = (reviewCode) => {
    navigate(`/reviewDetail/${reviewCode}`);
  };

  return (
    <>
      <div className={ReviewCSS.reviewTableDiv}>
        <table className={ReviewCSS.reviewTableCss}>
          <colgroup>
            <col width="10%" />
            <col width="50%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>리뷰 제목</th>
              <th>리뷰 작성일</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((review) => (
                <tr
                  key={review.reviewCode}
                  onClick={() => onClickTableTr(review.reviewCode)}
                >
                  <td>{review.reviewCode}</td>
                  <td>{review.reviewTitle}</td>
                  <td>{review.reviewCreateDate}</td>
                  <td>{review.reviewer.memberName}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        {pageInfo && (
          <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
        )}
      </div>
    </>
  );
}

export default Review;
