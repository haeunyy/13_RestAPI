import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LayoutCSS from './Layout.module.css';

function Layout() {

    const navigate = useNavigate();

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        alert('로그아웃 후 메인으로 이동합니다.');
        navigate('/', { replace : true });
    }

    return (
        <>
            <Header onClickLogoutHandler={onClickLogoutHandler}/>
            <Navbar/>
            <main className={ LayoutCSS.main }>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}

export default Layout;