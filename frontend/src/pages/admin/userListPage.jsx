import NavBar from "../../components/nav-bar/navBar";
import Footer from "../../components/footer/footer";
import UserListFetcher from "../../components/fetchers/admin/userListFetcher";

const UserListPage = () => {
  return (
    <>
      <NavBar />
      <UserListFetcher />
      <Footer />
    </>
  );
};

export default UserListPage;
