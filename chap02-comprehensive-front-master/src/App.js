import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/products/Main";
import ProductDetail from "./pages/products/ProductDetail";
import Register from "./pages/member/Register";
import Login from "./pages/member/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/error/Error";
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";
import ProductManagement from "./pages/admin/ProductManagement";
import ProductRegistration from "./pages/admin/ProductRegistration";
import ProductUpdate from "./pages/admin/ProductUpdate";
import Purchase from "./pages/purchase/Purchase";
import Payment from "./pages/member/Payment";
import Review from "./pages/review/Review";
import ReviewDetail from "./pages/review/ReviewDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="product/categories/:categoryCode" element={<Main />} />
          <Route path="search" element={<Main />} />
          <Route path="product/:productCode" element={<ProductDetail />} />
          <Route
            path="product/:productCode/purchase"
            element={
              <ProtectedRoute loginCheck={true}>
                <Purchase />
              </ProtectedRoute>
            }
          />

          <Route path="mypage" element={<MyPageLayout />}>
            <Route index element={<Navigate to="/mypage/profile" replace />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute loginCheck={true}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="payment"
              element={
                <ProtectedRoute loginCheck={true}>
                  <Payment />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="product-management"
            element={
              <ProtectedRoute authCheck={true}>
                <ProductManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="product-registration"
            element={
              <ProtectedRoute authCheck={true}>
                <ProductRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path="product-update/:productCode"
            element={
              <ProtectedRoute authCheck={true}>
                <ProductUpdate />
              </ProtectedRoute>
            }
          />

          <Route path="review/:productCode" element={<Review />} />
          <Route path="reviewDetail/:reviewCode" element={<ReviewDetail />} />
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
          path="/register"
          element={
            <ProtectedRoute loginCheck={false}>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
