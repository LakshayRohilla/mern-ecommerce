import { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";


export default function ProdRating({ readOnly, value }) {
  // For adding the review :
  const [takeReview, setTakeReview] = useState(0);
  console.log(`take review value is ${takeReview}`);

  return (
    <Stack spacing={1} sx={{mt:0.3}}>
      {readOnly ? (
        <Rating
          name="half-rating-read"
          defaultValue={value}
          precision={0.5}
          readOnly
          size="small"
        />

      ) : (
        <Rating onChange={(event, newValue) => {setTakeReview(newValue);}}name="half-rating" precision={0.5} size="small"/>
        
      )}
    </Stack>
  );
}
