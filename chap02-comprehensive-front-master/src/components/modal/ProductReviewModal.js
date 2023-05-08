import ProductReviewModalCSS from "./ProductReviewModal.module.css";

function ProductReviewModal() {
  return (
    <div className={ProductReviewModalCSS.modal}>
      <div className={ProductReviewModalCSS.modalContainer}>
        <div className={ProductReviewModalCSS.productReviewModalDiv}>
          <h1>리뷰</h1>
          <input type="text" name="reviewTitle" />
          <input type="text" name="reviewCreateDate" />
          <textarea placeholder="리뷰 본문" name="reviewContent"></textarea>
          <button
            style={{
              border: "none",
              margin: 0,
              fontSize: "10px",
              height: "10px",
            }}
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductReviewModal;
