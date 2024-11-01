import HomePage from "./pages/home-page";
import ProductDetail from "./pages/product-detail";
// import NavBar from "./components/nav-bar/navBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from "./pages/cart-page";

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
    </>
  );
}
// "rafce" is the short cut to make component.
