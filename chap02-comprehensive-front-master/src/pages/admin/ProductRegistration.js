import { useNavigate } from "react-router-dom";
import ProductRegistrationCSS from "./ProductRegistration.module.css";

function ProductRegistration() {
  const navigate = useNavigate();

  const onClickImageHandler = () => {};

  return (
    <div>
      <div className={ProductRegistrationCSS.productButtonDiv}>
        <button onClick={() => navigate(-1)}>돌아가기</button>
        <button>상품 등록</button>
      </div>
      <div className={ProductRegistrationCSS.productSection}>
        <div className={ProductRegistrationCSS.productInfoDiv}>
          <div className={ProductRegistrationCSS.productImageDiv}>
            <img
              className={ProductRegistrationCSS.productImage}
              alt="preview"
            />
            <input
              style={{ display: "none" }}
              type="file"
              name="productImage"
              accept="image/jpg,image/png,image/jpeg,image/gif"
            />
            <button
              className={ProductRegistrationCSS.productImageButton}
              onClick={onClickImageHandler}
            >
              이미지 업로드
            </button>
          </div>
        </div>
        <div className={ProductRegistrationCSS.productInfoDiv}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>상품이름</label>
                </td>
                <td>
                  <input
                    name="productName"
                    placeholder="상품 이름"
                    className={ProductRegistrationCSS.productInfoInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>상품가격</label>
                </td>
                <td>
                  <input
                    name="productPrice"
                    placeholder="상품 가격"
                    type="number"
                    className={ProductRegistrationCSS.productInfoInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>활성화 여부</label>
                </td>
                <td>
                  <label>
                    <input type="radio" name="productOrderable" value="Y" /> Y
                  </label>{" "}
                  &nbsp;
                  <label>
                    <input type="radio" name="productOrderable" value="N" /> N
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>상품 종류</label>
                </td>
                <td>
                  <label>
                    <input type="radio" name="categoryCode" value="1" /> 식사
                  </label>{" "}
                  &nbsp;
                  <label>
                    <input type="radio" name="categoryCode" value="2" /> 디저트
                  </label>{" "}
                  &nbsp;
                  <label>
                    <input type="radio" name="categoryCode" value="3" /> 음료
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>상품 재고</label>
                </td>
                <td>
                  <input
                    placeholder="상품 재고"
                    type="number"
                    name="productStock"
                    className={ProductRegistrationCSS.productInfoInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>상품 설명</label>
                </td>
                <td>
                  <textarea
                    className={ProductRegistrationCSS.textAreaStyle}
                    name="productDescription"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductRegistration;
