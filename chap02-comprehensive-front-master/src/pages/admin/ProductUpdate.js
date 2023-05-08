import ProductRegistrationCSS from './ProductRegistration.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callProductDetailForAdminAPI, callProductUpdateAPI } from './../../apis/ProductAPICalls';

function ProductUpdate(){

    const { productCode } = useParams();
    const data = useSelector(state => state.productReducer);
    const { modify } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({});

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);
    
    /* 최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(()=> {
        dispatch(callProductDetailForAdminAPI({productCode}));
    }, []);

    useEffect(() => {
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    }, 
    [image]
    );

    useEffect(
        () => {
            if(modify?.status === 200) {
                alert('상품 수정이 완료 되었습니다.');
                navigate('/product-management', { replace : true });
            }
        },
        [modify]
    )

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });
    }

    /* 카테고리 값 변경될 때 */
    const onChangeCategoryHandler = (e) => {
        setForm({
            ...form,
            category : { categoryCode : e.target.value }
        });
    }

    /* 이미지 첨부 버튼 클릭 이벤트 */
    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    /* 파일 첨부 시 동작하는 이벤트 */
    const onChangeImageUpload = (e) => {
        const image = e.target.files[0];
        setImage(image);
    }

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({ ...data });
    }

    /* 상품 수정 저장 버튼 클릭 이벤트 */
    const onClickProductUpdateHandler = () => {

        const formData = new FormData();

        formData.append("productCode", form.productCode);
        formData.append("productName", form.productName);
        formData.append("productPrice", form.productPrice);
        formData.append("productOrderable", form.productOrderable);
        formData.append("productStock", form.productStock);
        formData.append("productDescription", form.productDescription);
        formData.append("category.categoryCode", form.category.categoryCode);

        if(image) {
            formData.append("productImage", image);
        }

        dispatch(callProductUpdateAPI(formData));
    }

    const inputStyle = !modifyMode ? { backgroundColor : 'gray'} : null;
    const checkValue = !modifyMode ? data.category?.categoryCode : form.category?.categoryCode;

    return (
        <div>
            <div className={ ProductRegistrationCSS.productButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            {!modifyMode &&
                    <button 
                        onClick={ onClickModifyModeHandler }
                    >
                        수정 모드
                    </button>
            }
            { modifyMode && 
                    <button 
                        onClick={ onClickProductUpdateHandler }
                    >
                        상품 수정 저장하기
                    </button>
            }
            </div>      
            { data.productCode  &&   
            <div className={ ProductRegistrationCSS.productSection }>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <div className={ ProductRegistrationCSS.productImageDiv }>
                        <img 
                            className={ ProductRegistrationCSS.productImage } 
                            src={ !imageUrl ? data.productImgUrl : imageUrl } 
                            alt="preview"
                        />
                        <input                
                            style={ { display: 'none' }}
                            type="file"
                            name='productImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        />
                        <button 
                            className={ ProductRegistrationCSS.productImageButton }
                            onClick={ onClickImageUpload } 
                            style={ inputStyle }
                            disabled={ !modifyMode }
                        >
                            이미지 업로드
                            </button>
                    </div>
                </div>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>상품이름</label></td>
                                <td>
                                    <input 
                                        name='productName'
                                        placeholder='상품 이름'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? data.productName : form.productName }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>상품가격</label></td>
                                <td>
                                    <input 
                                        name='productPrice'
                                        placeholder='상품 가격'
                                        type='number'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? data.productPrice : form.productPrice }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>활성화 여부</label></td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="productOrderable"  
                                            onChange={ onChangeHandler } 
                                            value="Y"
                                            readOnly={ !modifyMode }
                                            checked={ (!modifyMode ? data.productOrderable : form.productOrderable) === 'Y' ? true : false }
                                        /> 
                                            Y
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="productOrderable"  
                                            onChange={ onChangeHandler } 
                                            value="N"
                                            readOnly={ !modifyMode }
                                            checked={ (!modifyMode ? data.productOrderable : form.productOrderable) === 'N' ? true : false }
                                        /> N</label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>상품 종류</label></td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="categoryCode" 
                                            onChange={ onChangeCategoryHandler } 
                                            value={1}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 1 }
                                        /> 식사
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="categoryCode" 
                                            onChange={ onChangeCategoryHandler } 
                                            value={2}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 2 }
                                        /> 디저트
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="categoryCode" 
                                            onChange={ onChangeCategoryHandler } 
                                            value={3}
                                            readOnly={ !modifyMode }
                                            checked={ checkValue == 3 }
                                        /> 음료
                                    </label>
                                </td>
                            </tr> 
                            <tr>
                                <td><label>상품 재고</label></td>
                                <td>
                                <input 
                                        placeholder='상품 재고'
                                        type='number'
                                        name='productStock'
                                        onChange={ onChangeHandler }
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        value={ !modifyMode ? data.productStock : form.productStock }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    />
                                </td>
                            </tr> 
                            <tr>
                                <td><label>상품 설명</label></td>
                                <td>
                                    <textarea 
                                        className={ ProductRegistrationCSS.textAreaStyle }
                                        name='productDescription'
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? data.productDescription : form.productDescription }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    ></textarea>
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                </div>
            </div>
        }
        </div>
    );

}

export default ProductUpdate;