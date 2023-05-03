import { NavLink, useNavigate } from "react-router-dom";
import HeaderCSS from './Header.module.css';
import { useState } from "react";
import { isLogin } from "../../utils/TokenUtils";

function Header() {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    /* 로고 클릭 시 메인 페이지로 이동  */
    const onClickLogoHandler = () => {
        navigate("/");
    }
    
    /* 검색어 입력 값 상태 저장 */
    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    /* Enter키 입력 시 검색 화면으로 넘어가는 이벤트 */
    const onEnterKeyHandler = (e) => {
        if(e.key === 'Enter') {
            console.log('Enter key : ', search);
            navigate(`/search?value=${search}`);
        }
    }

    function BeforeLogin() {
        return (
            <div>
                <NavLink to="/login">로그인</NavLink> | <NavLink to="register">회원가입</NavLink>
            </div>
        );
    }

    function AfterLogin() {

        const onClickLogoutHandler = () => {
            window.localStorage.removeItem('accessToken');
            alert('로그아웃 후 메인으로 이동합니다.');
            navigate('/', { replace : true });
        }

        const onClickMyPageHandler = () => {
            navigate("/mypage");
        }

        return (
            <div>
                <button
                    className={ HeaderCSS.HeaderBtn }
                    onClick={ onClickMyPageHandler }
                >
                    마이페이지
                </button> | 
                <button
                    className={ HeaderCSS.HeaderBtn }
                    onClick={ onClickLogoutHandler }
                >
                    로그아웃
                </button>
            </div>
        );
    }

    return (
        <>
            <div className={HeaderCSS.HeaderDiv}>
                <button 
                    className={ HeaderCSS.LogoBtn }
                    onClick={ onClickLogoHandler }
                >
                    GREEDY
                </button>
                <input 
                    className={ HeaderCSS.InputStyle } 
                    type="text" 
                    placeholder="검색"
                    onChange={onSearchChangeHandler}
                    onKeyUp={ onEnterKeyHandler }
                />
                { isLogin() ? <AfterLogin/> : <BeforeLogin/> }
            </div>
        </>
    );

}

export default Header;