import NavBar from "../components/nav-bar/navBar";
import Footer from "../components/footer/footer";
import PlaceOrderFetcher from "../components/fetchers/placeOrderFetcher";

const PlaceOrderPage = () => {
  return (
    <>
      <NavBar />
      <PlaceOrderFetcher />
      <Footer />
    </>
  );
};

export default PlaceOrderPage;
