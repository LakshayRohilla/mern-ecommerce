import Grid from '@mui/material/Grid';
import { Box, Paper, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const PlaceOrderCartItems = ({item}) => {
    return (
        <Box key={item._id} sx={{ mb: 1, mt:1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <Item>
            <Box sx={{ p: 0 }}>
              <img src={item.image} alt={item.name} style={{ height: "60px", width: "60px", borderRadius:12 }} />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <Box component={Link} to={`/product/${item._id}`} sx={{ color: 'inherit', textDecoration: 'none' }}>
              {item.name}
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <Box sx={{ color: 'text.secondary' }}>{item.qty} * ₹{item.price} = {item.qty*item.price}</Box>
          </Item>
        </Grid>
        
      </Grid>
    </Box>
    );
}

export default PlaceOrderCartItems;