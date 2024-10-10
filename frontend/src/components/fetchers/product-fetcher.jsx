import { useEffect, useState } from "react";
import ProductCard from '../cards/product-card'
import Products from '../../products';
import { Box, Grid } from "@mui/material";
import axios from 'axios';

const ProductFetcher = function () {

  const [products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchproducts = async () => {
          try{
            const response = await axios.get('/api/products');
            setProducts(response.data.products)
            console.log(response.data.products);
          } catch (err) {
            console.log(err.response?.data?.message || 'Something went wrong!');
          }
        }
        fetchproducts();
    }, []);

  return (
    <>
      <Box sx={{ ml: 6, mr:6, mt:2, mb:2}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          <p>All Product`s</p>
        </Box>
        {/* This one is with dummy data */}
        {/* <Grid container spacing={2}>
          {Products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid> */}
        {/* With data that we are receiving from backend */}
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductFetcher;
