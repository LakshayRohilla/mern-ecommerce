import { Box, Button } from "@mui/material";
import ProductsDetailsFetcher from "../components/fetchers/product-detail-fetcher";
import Footer from "../components/footer/footer";
import NavBar from "../components/nav-bar/navBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  return (
    <>
      <NavBar/>
      <Box sx={{mt:4}}>
      <Button
        component={Link}
        to={`/`}
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{
          color: "white",
          backgroundColor: "black",
          "&:hover": { backgroundColor: "grey" },
          ml: 4
        }}
      >
        Back
      </Button>
      </Box>
      <ProductsDetailsFetcher />
      
      <Footer />
      </>
  );
};

export default ProductDetail;
