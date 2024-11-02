import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Paper, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from '../../../store/slices/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CartItem = function({ item }) {
  const [qty, setQty] = useState(item.qty);
  const dispatch = useDispatch();

  function handleQuantityAdd() {
    const newQty = qty + 1;
    setQty(newQty);
    dispatch(addToCart({ ...item, qty: newQty }));
  }

  function handleQuantityRemove() {
    const newQty = qty - 1;
    setQty(newQty);
    dispatch(addToCart({ ...item, qty: newQty }));
  }

  function handleDeleteButton(){
    dispatch(removeFromCart(item._id));
  }

  return (
    <Paper elevation={3} key={item._id} sx={{ mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={2}>
          <Item>
            <Box sx={{ p: 0 }}>
              <img src={item.image} alt={item.name} style={{ height: "100px", width: "100px" }} />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item>
            <Box component={Link} to={`/product/${item._id}`} sx={{ color: 'inherit', textDecoration: 'none' }}>
              {item.name}
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={2}>
          <Item>
            <Box sx={{ color: 'text.secondary' }}>₹ {item.price}</Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                Quantity:
              </Typography>
              <Button onClick={handleQuantityRemove} disabled={qty <= 1}>
                <RemoveIcon />
              </Button>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16, fontWeight: 'bold' }}>
                {qty}
              </Typography>
              <Button onClick={handleQuantityAdd} disabled={qty >= item.countInStock}>
                <AddIcon />
              </Button>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={2}>
          <Item sx={{ pb: 2 }}>
            <Button onClick={handleDeleteButton}
              variant="contained"
              endIcon={<DeleteIcon />}
              sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' } }}
            >
              Delete
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
