import NavBar from "../components/nav-bar/navBar";
import Footer from '../components/footer/footer'
import ProfileFetcher from '../components/fetchers/profileFetcher';

const ProfilePage = () => {
    return (
        <>
            <NavBar/> 
            <ProfileFetcher/>
            <Footer/>
        </>
    );
}

export default ProfilePage;