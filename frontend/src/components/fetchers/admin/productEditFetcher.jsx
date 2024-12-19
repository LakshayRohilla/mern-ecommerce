import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../../shared/UI/alertMessage";
import Spinner from "../../shared/UI/spinner";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
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
import FileUploadIcon from "@mui/icons-material/FileUpload";

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
    isError,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  // For image upload 
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(); // for image preview

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
      setImage(product?.product?.image || "");
      setBrand(product.product.brand || "");
      setCategory(product.product.category || "");
      setCountInStock(product.product.countInStock || 0);
      setDescription(product.product.description || "");
    }
    // For Image preview 
    if(file){
      const fileReader = new FileReader(); // this is built-in in the browser.
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    }
  }, [product, file]);

  const handleImageChange = async (e) => {

      const file = e.target.files[0]; // Access the file directly from the event

      if (!file) return; // Guard clause to ensure a file is selected
      setFile(file);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        // Extract relative path (assuming backend returns the full path)
    const relativeImagePath = `/uploads/${res.image.split("\\").pop()}`;
    setImage(relativeImagePath); // Update the image state with the relative path
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
  
  return (
    <Box sx={{ m: 4 }}>
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
      <ThemeProvider theme={defaultTheme}>
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
                      value={image}
                      required
                      fullWidth
                      label="Enter Image URL"
                      autoComplete="image"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Grid>

                  {/* File Upload Section */}
                  <Grid item xs={12}>
                    <input
                      accept="image/*"
                      type="file"
                      id="image" // Unique ID for the file input
                      name="image"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image">
                      <Button
                        variant="contained"
                        component="span"
                        endIcon={<FileUploadIcon />}
                        sx={{
                          color: "white",
                          backgroundColor: "black",
                          "&:hover": { backgroundColor: "grey" },
                          width: "100%",
                        }}
                      >
                        Upload Image
                      </Button>
                    </label>
                  </Grid>

                  {loadingUpload && (
                    <Grid item xs={12}>
                      <Spinner minimumHeight={"10vh"} />
                    </Grid>
                  )}

                  {/* Image Preview */}
                  {image && !previewUrl && (
                    <Grid item xs={12}>
                      <Box mt={2}>
                        <img
                          src={image}
                          alt="Image cant load"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      </Box>
                    </Grid>
                  )}
                  {previewUrl && (
                    <Grid item xs={12}>
                      <Box mt={2}>
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      </Box>
                    </Grid>
                  )}
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
