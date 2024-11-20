import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../store/slices/cartSlice";
import CheckoutSteps from "../components/checkoutSteps";
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Button, Paper } from '@mui/material';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) { // In case we dont have any shipping address in the local storage
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Box>
      <CheckoutSteps currentStep={2} />
        <Box  sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 150px)", // Adjust height to accommodate the steps
        }}>
        {/* Heading */}
        <Typography variant="h3" component="h1" gutterBottom sx={{color:'grey', fontWeight:'bolder'}}>
          Payment Method
        </Typography>

        {/* Sub-heading */}
        <Typography variant="h5" component="h1" gutterBottom sx={{color:'grey', fontWeight:'bold'}}>
          Select Method
        </Typography>

        {/* Radio Group */}
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          sx={{
            alignItems: "flex-start", // Align radio group items to the left
            mb: 3, // Add margin to the bottom
          }}
        >
          <FormControlLabel
            value="PayPal"
            control={<Radio />}
            label="PayPal or Credit Card"
            sx={{fontWeight:'bold'}}
          />
        </RadioGroup>

        {/* Continue Button */}
        <Button type="submit"variant="contained" sx={{color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' }}} onClick={submitHandler}>
          Continue
        </Button>
        </Box>
    </Box>
  );
};

export default PaymentPage;
