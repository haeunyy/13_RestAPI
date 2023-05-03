import { useEffect, useState } from 'react';
import ProductManagementCSS from './ProductManagement.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callProductListForAdminAPI } from '../../apis/ProductAPICalls';
import PagingBar from '../../components/common/PagingBar';
import { useNavigate } from 'react-router-dom';

function ProductManagement() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, pageInfo } = useSelector(state => state.productReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callProductListForAdminAPI({ currentPage }));
        },
        [currentPage]
    );

    // 테이블의 상품 행을 클릭 시 상품 상세 및 수정 페이지로 라우팅
    const onClickTableTr = (productCode) => {
        navigate(`/product-update/${productCode}`);
    }

    const onClickProductInsert = () => {
        navigate("/product-registration");
    }

    return (
        <div className={ ProductManagementCSS.bodyDiv }>
            <div className={ ProductManagementCSS.buttonDiv }>
                <button onClick={ onClickProductInsert }>상품 등록</button>
            </div>
             <table className={ ProductManagementCSS.productTable }>
                <colgroup>
                    <col width="15%" />
                    <col width="40%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품이름</th>
                        <th>상품가격</th>
                        <th>활성화여부</th>
                        <th>상품 카테고리</th>
                        <th>재고</th>
                    </tr>
                </thead>
                <tbody>
                    { data && data.map(p => 
                        (<tr
                            key={ p.productCode }
                            onClick={ () => onClickTableTr(p.productCode) }
                        >
                            <td>{ p.productCode }</td>
                            <td>{ p.productName }</td>
                            <td>{ p.productPrice }</td>
                            <td>{ p.productOrderable }</td>
                            <td>{ p.category.categoryName }</td>
                            <td>{ p.productStock }</td>
                        </tr>))
                    }
                </tbody>
                </table>
                <div>
                    { pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/> }
                </div>
        </div>
    );
}

export default ProductManagement;