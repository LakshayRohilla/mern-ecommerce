import { useEffect } from "react";
import ProductCard from '../cards/product-card'
import Products from '../../products';
import { Box, Grid } from "@mui/material";

const ProductFetcher = function () {

    useEffect(()=>{
        console.log(Products);
    })
  return (
    <>
      <Box sx={{ m: 6}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "50px",
          }}
        >
          <p sty>All Product`s</p>
        </Box>

        <Grid container spacing={2}>
          {Products.map((product) => (
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
