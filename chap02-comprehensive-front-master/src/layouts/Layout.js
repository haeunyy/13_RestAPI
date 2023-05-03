import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import LayoutCSS from "./Layout.module.css";
import Footer from "../components/common/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Navbar />
      <main className={LayoutCSS.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
