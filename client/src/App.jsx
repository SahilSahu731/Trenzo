import { useSelector } from "react-redux";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { useEffect } from "react";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserLayout from "./components/layout/UserLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileOverviewPage from "./pages/profile/ProfileOverviewPage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import SettingsPage from "./pages/profile/SettingsPage";
import SecurityPage from "./pages/profile/SecurityPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProductListPage from "./pages/admin/AdminProductListPage";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Explore from "./pages/Explore";
import AdminCategoryListPage from "./components/admin/AdminCategoryListPage";
import Categories from "./pages/Categories";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const theme = useSelector((state) => state.theme.mode);

  //  const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const fetchUserCart = async () => {
  //     dispatch(cartRequestStart());
  //     try {
  //       const { data } = await axios.get(CART_API_URL, { withCredentials: true });
  //       dispatch(cartUpdateSuccess(data));
  //     } catch (err) {
  //       // We can fail silently here as the cart might be empty
  //       dispatch(cartRequestFail(null));
  //     }
  //   }
  //   if(isAuthenticated) {
  //     fetchUserCart();
  //   }
  // }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      root.classList.add(systemTheme ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <main>
      <Routes>
        {/* ---------Login routes --------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---------Public routes --------- */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryProductsPage />}
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/deals" element={<div>Deals Page</div>} />
          <Route
            path="/store/accessories"
            element={<div>Accessories Page</div>}
          />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />

          {/* ---------Protected routes --------- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserLayout />}>
              {/* The index route is the default page shown at "/profile" */}
              <Route index element={<ProfileOverviewPage />} />
              <Route path="edit" element={<EditProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="security" element={<SecurityPage />} />
            </Route>
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* You can add other protected routes like /dashboard here */}
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          </Route>
        </Route>

        {/* ---------Admin routes --------- */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductListPage />} />
            <Route path="categories" element={<AdminCategoryListPage />} />
            {/* Add other admin routes here */}
            {/* <Route path="orders" element={<AdminOrderListPage />} /> */}
            {/* <Route path="users" element={<AdminUserListPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
