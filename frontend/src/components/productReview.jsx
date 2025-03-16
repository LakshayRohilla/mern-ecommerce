import { useCreateReviewMutation } from "../store/slices/productApiSlice.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import AlertMessage from "../components/shared/UI/alertMessage";
import ProdRating from "../components/shared/UI/prod-rating";
import Spinner from '../components/shared/UI/spinner';
import { Link } from 'react-router-dom'

const ProductReview = ({ refetch, product }) => {
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

//   console.log(product);
console.log(rating);

  return (
    <Box sx={{ pb: 4, pl: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} className='grey-heading'>
        Reviews
      </Typography>
      {product.reviews.length === 0 && <AlertMessage>No Reviews</AlertMessage>}
      {product.reviews.map((review) => (
        <Box key={review._id}>
          <strong>{review.name}</strong>
          <ProdRating readOnly={true} value={product.rating} />
          <p>{review.createdAt.substring(0, 10)}</p>
          <p>{review.comment}</p>
        </Box>
      ))}
      <Box sx={{width:'60%'}}>
        <Typography variant="h6" sx={{ fontWeight: "bold", backgroundColor:'#f5f5f5', pl:2, borderRadius:"40px" }} className='grey-text'>
        Write a product review
        </Typography>
        {loadingProductReview && <Spinner minimumHeight={'10vh'}/>}
        {userInfo ? <ProdRating /> : (<AlertMessage> Please  <Link to='/login'>log in</Link> to write a review</AlertMessage>)}
        
      </Box>
    </Box>
  );
};

export default ProductReview;
