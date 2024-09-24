import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ProductCard({product}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
        <CardMedia
          component="img"
          height="220"
        //   image="https://picsum.photos/seed/picsum/200/300"
          image={product.image}
          alt="green iguana"
        />
        </CardContent>
        <CardContent>
          <Typography variant="body2" >
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'grey'}}>
            ₹{product.price}
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
