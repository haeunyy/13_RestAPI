import { NavLink } from 'react-router-dom';
import NavbarCSS from './Navbar.module.css';
import { isAdmin } from './../../utils/TokenUtils';

function Navbar() {

    const style = { textDecoration : 'none', color : 'slateblue', fontWeight : 'bold'};
    const activeStyle = ({ isActive }) => isActive ? style : undefined;

    return (
        <div className={ NavbarCSS.NavbarDiv }>
            <div className={ NavbarCSS.NavlistUl }>
                <li><NavLink to="/" style={ activeStyle }>모든음식</NavLink></li>
                <li><NavLink to="/product/categories/1" style={ activeStyle }>식사</NavLink></li>
                <li><NavLink to="/product/categories/2" style={ activeStyle }>디저트</NavLink></li>
                <li><NavLink to="/product/categories/3" style={ activeStyle }>음료</NavLink></li>
                { isAdmin() && <li><NavLink to="/product-management" style={ activeStyle }>상품등록</NavLink></li> }
            </div>
        </div>
    );
}

export default Navbar;