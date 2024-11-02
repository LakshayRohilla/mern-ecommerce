import { useSelector } from "react-redux";
import { Box, Button, Divider, Paper } from "@mui/material";
import AlertMessage from "../shared/UI/alertMessage";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CartItem from "../shared/Layout/cart-item";
import Grid from '@mui/material/Grid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from "react-router-dom";

const CartFetcher = function () {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  const handleCheckout = () => navigate('/login?redirect=/shipping');
  
  return (
    <Box sx={{ color: "grey", m: 3}}>
      <h1 style={{marginBottom:"38px"}}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <>
          <AlertMessage severity="info">No item in cart !!! </AlertMessage>
          <Box component={Link} to='/'>
          <Button
                variant="contained"
                endIcon={<HomeIcon />}
                sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' } }}
            >
                Go Back
            </Button>
          </Box>
        </>  
      ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => <CartItem item={item}/>)}
            </Grid>
            <Grid sx={{pl:1.5}} xs={12} md={4}>
              <Paper elevation={4} >
                <Box sx={{pr:6, pl:6, pb:0.4, pt:3}}>
                  <h1 style={{color:"grey"}}>Subtotal ({cartItems.reduce((acc, item)=> acc+item.qty, 0)}) Items</h1>
                </Box>
                <Box sx={{pl:6, fontWeight:'bolder'}}>₹ {cartItems.reduce((acc, item)=> acc+item.qty*item.price, 0).toFixed(2)}</Box>
                <Divider sx={{pt:3}}/>
                <Box sx={{display:'flex', justifyContent:'center', pb:1.5, pt:2}}>
                <Button onClick={handleCheckout}
                  variant="contained"
                  endIcon={<NavigateNextIcon />}
                  sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' } }}
                >
                  Proceed To Checkout 
                </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
      )}
    </Box>
  );
};

export default CartFetcher;
