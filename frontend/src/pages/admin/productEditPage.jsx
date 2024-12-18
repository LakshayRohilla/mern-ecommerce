import NavBar from '../../components/nav-bar/navBar';
import Footer from '../../components/footer/footer';  
import ProductEditFetcher from '../../components/fetchers/admin/productEditFetcher';

const ProductEditPage = () => {
    return (
        <>
        <NavBar/>
        <ProductEditFetcher/>
        <Footer/>
        </>
    )
}

export default ProductEditPage;