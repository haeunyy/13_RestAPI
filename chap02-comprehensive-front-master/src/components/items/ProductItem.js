import { useNavigate } from 'react-router-dom';
import ProductCSS from './ProductItem.module.css';

function ProductItem({ product : { productCode, productImgUrl, productName, productPrice }}) {

    const navigate = useNavigate();

    const onClickProductHandler = (productCode) => {
        navigate(`/product/${productCode}`);
    }

    return (
        <div 
            className={ ProductCSS.productDiv }
            onClick={ () => onClickProductHandler(productCode) }
        >
            <img src={ productImgUrl } alt={ productName }/>
            <h5>{ productName }</h5>
            <h5>{ productPrice }</h5>
        </div>
    );
}

export default ProductItem;