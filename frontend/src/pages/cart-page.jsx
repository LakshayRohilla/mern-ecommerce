import Footer from "../components/footer/footer";
import NavBar from "../components/nav-bar/navBar";
import CartFetcher from "../components/fetchers/cart-fetcher";

const CartPage = function() {
    return (
        <>
            <NavBar/>
            <CartFetcher/>
            <Footer/>
        </>
    );
}

export default CartPage;