import ProductFetcher from "../components/fetchers/product-fetcher";
import Footer from "../components/footer/footer";
import NavBar from '../components/nav-bar/navBar'

const HomePage = () => {
  return (
    <>
      <NavBar/> 
      <ProductFetcher/>
      <Footer />
    </>
  );
};

export default HomePage;
