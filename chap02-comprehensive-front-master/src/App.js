import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/products/Main";
import ProductDetail from "./pages/products/ProductDetail";
import Regist from "./pages/member/Regist";
import Login from "./pages/member/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/error/Error";
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="product/categories/:categoryCode" element={<Main />} />
          <Route path="search" element={<Main />} />
          <Route path="product/:productCode" element={<ProductDetail />} />
          <Route path="mypage" element={<MyPageLayout />}>
            <Route index element={<Navigate to="/mypage/profile" replace />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route
          path="/login"
          element={
            <ProtectedRoute loginCheck={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/regist"
          element={
            <ProtectedRoute loginCheck={false}>
              <Regist />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
