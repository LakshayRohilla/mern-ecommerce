import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ProdRating from '../UI/prod-rating';
import ProductDetailsCartSection from './product-details-cart-section';
import { addToCart } from '../../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SnackbarProvider } from "notistack";

const ProductDetailsLayout = ({ product }) => {
  const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const onCartAddHandler = function(qty) {
      dispatch(addToCart({...product, qty}));
      // navigate('/');
  }
  return (
    <SnackbarProvider>
    <Grid container spacing={2} sx={{p:4}}>
      {/* Left Side: Image */}
      <Grid item xs={12} sm={4.5}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
      </Grid>

      {/* Right Side: Title, Description, Price, and Buy Button */}
      <Grid item xs={12} sm={4.5} container direction="column" spacing={2} sx={{pr:1.3}}>
        <Grid item>
          <Typography variant="h4">{product.name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            {product.description}
          </Typography>
        </Grid>
        <Grid item>
        <Box sx={{display:'flex'}}>
            <ProdRating readOnly={true} value={product.rating}/>
            <Typography gutterBottom  sx={{ color: 'grey'}} className='rating-text'>
              {product.numReviews} reviews
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="h6" color='text.secondary' sx={{fontWeight:"bold"}}>
            {'Price: '}₹{product.price}
          </Typography>
        </Grid>
      </Grid>
      {/* Cart Section */}
      <Grid item xs={12} sm={3} container  spacing={2} sx={{float:'right', width: '100%'}}>
        <ProductDetailsCartSection price={product.price} countInStock={product.countInStock} onCartAddHandler={onCartAddHandler}/>
      </Grid>
    </Grid>
    </SnackbarProvider>
  );
};

export default ProductDetailsLayout;
