import OrderListFetcher from "../../components/fetchers/admin/orderListFetcher.jsx";
import NavBar from "../../components/nav-bar/navBar";
import Footer from "../../components/footer/footer";

const OrderListPage = () => {
  return (
    <>
      <NavBar />
      <OrderListFetcher />
      <Footer />
    </>
  );
};

export default OrderListPage;
