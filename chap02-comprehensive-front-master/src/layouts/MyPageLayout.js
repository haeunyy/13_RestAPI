import { Outlet } from "react-router-dom";
import MyPageNavbar from "../components/common/MyPageNavbar";
import MyPageLayoutCSS from './MyPageLayout.module.css';

function MyPageLayout() {
    return (
        <div className={ MyPageLayoutCSS.myPageLayoutDiv }>
            <MyPageNavbar/>
            <main className={ MyPageLayoutCSS.main }>
                <Outlet/>
            </main>
        </div>
    );
}

export default MyPageLayout;