import NavBar from '../../components/nav-bar/navBar';
import Footer from '../../components/footer/footer';
import ProductListAdminFetcher from '../../components/fetchers/admin/productListAdminFetcher'

const ProductListPage = () => {
    return (
        <>
        <NavBar/>
        <ProductListAdminFetcher/>
        <Footer/>
        </>
    )
}

export default ProductListPage;