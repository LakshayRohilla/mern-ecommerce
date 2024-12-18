import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../../shared/UI/alertMessage";
import Spinner from "../../shared/UI/spinner";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../store/slices/productApiSlice.js";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  Box,
  Paper,
  Button,
  Typography,
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" to="/">
          Yogantaram
        </Link> */}
      <Box
        component={Link}
        to="/"
        sx={{
          color: "black",
          textDecoration: "none",
          cursor: "pointer",
          "&:hover": { color: "grey" },
        }}
        variant="body2"
      >
        <u> MERN E-Commerce</u>
      </Box>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const ProductEditFetcher = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    refetch,
    isError,} = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  console.log(`Name :${name}, Price : ${price}, Brand : ${brand}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId, // we are using this in the productApiSlice we need this id. 
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success("product updated successfully");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product?.product) {
      setName(product.product.name || "");
      setPrice(product.product.price || 0);
      setImage(product.product.image || "");
      setBrand(product.product.brand || "");
      setCategory(product.product.category || "");
      setCountInStock(product.product.countInStock || 0);
      setDescription(product.product.description || "");
    }
  }, [product]);

  return (
    <Box sx={{m:4}}>
      <Button
        variant="contained"
        component={Link}
        endIcon={<FormatListBulletedIcon />}
        sx={{
          color: "white",
          backgroundColor: "black",
          "&:hover": { backgroundColor: "grey" },
        }}
        to="/admin/productList"
      >
        Go Back to List
      </Button>
      <ThemeProvider theme={defaultTheme} >
        <Container component="main" maxWidth="xs">
          {/* {isError && <AlertMessage severity="error">Registration Failed !!! </AlertMessage>} */}
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* {isLoading && <Spinner/>} */}
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit Product
            </Typography>
            {loadingUpdate && <Spinner minimumHeight={"10vh"} />}
            {isLoading ? (
              <Spinner minimumHeight={"10vh"} />
            ) : isError ? (
              <AlertMessage severity="error">
                {isError?.data?.message || isError.error}
              </AlertMessage>
            ) : (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      value={name}
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Enter Name"
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={price}
                      required
                      fullWidth
                      id="price"
                      label="Enter Price"
                      name="price"
                      autoComplete="price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Grid>
                  {/* IMAGE INPUT PLACEHOLDER */}
                  <Grid item xs={12}>
                    <TextField
                      value={brand}
                      required
                      fullWidth
                      id="brand"
                      label="Enter Brand"
                      name="brand"
                      autoComplete="brand"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={category}
                      required
                      fullWidth
                      id="category"
                      label="Enter category"
                      name="category"
                      autoComplete="category"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={countInStock}
                      required
                      fullWidth
                      id="countInStock"
                      label="Enter countInStock"
                      name="countInStock"
                      autoComplete="countInStock"
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={description}
                      required
                      fullWidth
                      id="description"
                      label="Enter description"
                      name="description"
                      autoComplete="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    color: "white",
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "grey" },
                  }}
                >
                  Update Product
                </Button>
              </Box>
            )}
          </Box>

          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>      
      </Box>
  );
};

export default ProductEditFetcher;
