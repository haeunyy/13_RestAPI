import ProductItem from '../items/ProductItem';
import ProductListCSS from './ProductList.module.css';

function ProductList({productList}) {

    return (
        <div className={ ProductListCSS.productDiv }>
            {
                Array.isArray(productList)
                && productList.map(product => <ProductItem key={ product.productCode } product={product} />)
            }
        </div>
    );
}

export default ProductList;