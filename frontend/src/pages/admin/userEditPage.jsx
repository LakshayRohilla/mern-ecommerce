import NavBar from "../../components/nav-bar/navBar";
import Footer from '../../components/footer/footer';
import UserEditFetcher from '../../components/fetchers/admin/userEditFetcher'

const UserEditPage = () => {
    return (
        <>
        <NavBar/>
        <UserEditFetcher/>
        <Footer/>
        </>
    )
}

export default UserEditPage;