import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const ProductDetailsCartSection = function({price, countInStock}){
    return (
        <Card sx={{ width: '100%', maxHeight: 215 }}>
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
          </CardContent>
          <CardActions sx={{display:'flex', justifyContent:'center'}}>
            <Button
                variant="contained"
                endIcon={<ShoppingCartIcon />}
                sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' } }} 
            >
                Add To Cart
            </Button>
          </CardActions>
        </Card>
      );
}

export default ProductDetailsCartSection;