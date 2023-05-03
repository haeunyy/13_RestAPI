import { NavLink } from 'react-router-dom';
import MyPageNavbarCSS from './MyPageNavbar.module.css';

function MyPageNavbar() {

    const style = { textDecoration : 'none', color : 'slateblue', fontWeight : 'bold'};
    const activeStyle = ({ isActive }) => isActive ? style : undefined;

    return (
        <div className={ MyPageNavbarCSS.MyPageNavbarDiv }>
            <ul className={ MyPageNavbarCSS.MyPageNavbarUl }>
                <li><NavLink to="/mypage/profile" style={activeStyle}>회원 정보</NavLink></li>
                <li><NavLink to="/mypage/payment" style={activeStyle}>결제 정보</NavLink></li>
            </ul>
        </div>
    );
}

export default MyPageNavbar;