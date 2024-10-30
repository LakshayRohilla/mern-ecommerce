import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSnackbar } from 'notistack';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const ProductDetailsCartSection = function({price, countInStock, onCartAddHandler}){
    const [qty, setQty] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    
    function handleQuantityAdd(){
      setQty(qty+1);
    }

    function handleQuantityRemove(){
      setQty(qty-1);
    }

    const onCartAddClickHandler = function(variant) {
      onCartAddHandler(qty)
      enqueueSnackbar(qty > 1 ? `Added ${qty} item(s) to cart!` :  `Added ${qty} item to cart!`, { variant}); // Show snackbar
    }

    return (
        <Card sx={{ width: '100%', maxHeight: countInStock ? 285 : 215 }}>
          <CardContent>
            <Box sx={{display:'flex', m:2}}>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 ,flex:'1'}}>
                Price :
              </Typography>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 , fontWeight:'bold'}}>
              ₹{price}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', m:2}}>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16, flex: '1' }}>
                Status :
              </Typography>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16, fontWeight: 'bold' }}>
                {countInStock>0 ? 'In Stock' : 'Out of stock'}
              </Typography>
            </Box>
            <Divider />
            { countInStock > 0 && (
              <>
              <Box sx={{display:'flex', m:2, mr:-3, alignItems: 'center'}}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 ,flex:'1'}}>
                  Quantity :
                </Typography>
                {qty<=0 ? <Button onClick={handleQuantityRemove} disabled><RemoveIcon /></Button> : <Button onClick={handleQuantityRemove}><RemoveIcon /></Button>}
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 , fontWeight:'bold'}}>
                {qty}
                </Typography>
                {qty <= countInStock ? <Button onClick={handleQuantityAdd}><AddIcon /></Button> : <Button onClick={handleQuantityAdd} disabled><AddIcon /></Button>}
              </Box>
              <Divider />
            </>
            )}
          </CardContent>
          <CardActions sx={{display:'flex', justifyContent:'center'}}>
            {countInStock>0 ? <Button
                variant="contained"
                endIcon={<ShoppingCartIcon />}
                sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' } }} 
                onClick={() =>onCartAddClickHandler("success")}
                disabled={qty<=0 }
            >
                Add To Cart
            </Button> : <Button
                variant="contained"
                endIcon={<ShoppingCartIcon />}
                sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' } }}
                disabled
            >
                Add To Cart
            </Button>}
            
          </CardActions>
        </Card>
      );
}

export default ProductDetailsCartSection;