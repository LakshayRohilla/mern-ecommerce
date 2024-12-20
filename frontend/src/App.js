import HomePage from "./pages/home-page";
import ProductDetail from "./pages/product-detail";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from "./pages/cart-page";
import LogInPage from "./pages/login-page";
import SignUpPage from './pages/signUp-page.jsx'
import ShippingPage from './pages/shipping-page.jsx'
import AdminRoute from './components/adminRoute.jsx';
import PrivateRoute from './components/privateRoute.jsx'
import PaymentPage from './pages/paymentPage.jsx';
import PlaceOrderPage from './pages/placeOrderPage.jsx'
import OrderPage from './pages/orderPage.jsx';
import ProfilePage from './pages/profilePage.jsx';
import OrderListPage from './pages/admin/orderListPage.jsx';
import ProductListPage from './pages/admin/productListPage.jsx';
import ProductEditPage from './pages/admin/productEditPage.jsx';
import UserListPage from './pages/admin/userListPage.jsx'
import UserEditPage from './pages/admin/userEditPage.jsx'

export default function App(){
  return (
    <>
      {/* <h1 style={{backgroundColor:'#818589',display:'flex', justifyContent:'center', marginTop: '0', height:'4rem', alignItems:'center'}}>NavBar!!</h1> */}
      {/* <NavBar/> */}
      <BrowserRouter>
          <Routes> 
            <Route path="/" element={<HomePage/>}/>
            <Route path='/product/:pid' element={<ProductDetail/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/login" element={<LogInPage/>}/>
            <Route path="/signUp" element={<SignUpPage/>}/>
            <Route path="*" element={<p>404 Page Not Found</p>} />
            <Route path="" element={<PrivateRoute/>}>
              <Route path="/shipping" element={<ShippingPage/>}/>
              <Route path="/payment" element={<PaymentPage/>}/>
              <Route path="/placeorder" element={<PlaceOrderPage/>}/>
              <Route path="order/:oid" element={<OrderPage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
            </Route>
            <Route path="" element={<AdminRoute/>}>
              <Route path="/admin/orderList" element={<OrderListPage/>}/>
              <Route path="/admin/productList" element={<ProductListPage/>}/>
              <Route path="/admin/product/:id/edit" element={<ProductEditPage/>}/>
              <Route path="/admin/userList" element={<UserListPage/>}/>
              <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
            </Route>
            {/* <Route path='/appointment' element={<Appointment/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/product/:pid' element={<ProductDetails/>}/>
            <Route path='/treatments' element={<Treatments/>}/>
            <Route path='/resources' element={<Resources/>}/>
            <Route path='/events' element={<Events/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path="/login" element={<LogInPage/>}/>
            <Route path="/callbacklist" element={<CallBackInputList/>}/>
            <Route path="/tipsemaillist" element={<TipsSubsEmailList/>}/>
            <Route path="/add" element={<AddPage/>}/>
            <Route path="/product-edit" element={<ProductEdit/>}/> */}
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
    </>
  );
}
// "rafce" is the short cut to make component.
