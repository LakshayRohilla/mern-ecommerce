import Navbar from "../components/nav-bar/navBar";
import Footer from "../components/footer/footer";
import OrderFetcher from "../components/fetchers/order-fetcher";

const OrderPage = () => {
  return (
    <>
      <Navbar />
      <OrderFetcher />
      <Footer />
    </>
  );
};
export default OrderPage;
