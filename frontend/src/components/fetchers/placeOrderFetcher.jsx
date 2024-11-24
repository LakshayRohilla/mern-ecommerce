import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../store/slices/ordersApiSlice";
import CheckoutSteps from "../shared/UI/checkoutSteps";
import { toast } from "react-toastify";
import AlertMessage from "../shared/UI/alertMessage";
import Spinner from "../shared/UI/spinner";
import { clearCartItems } from "../../store/slices/cartSlice";
import { Box, Paper, Button, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlaceOrderCartItems from '../shared/Layout/placeOrderCartItems';

const PlaceOrderFetcher = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  async function onContinueClick(){
    try {
        const res = await createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }).unwrap();
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
        console.log(res);
      } catch (err) {
        toast.error(err);
      }
  };

  return (
    <>
      <CheckoutSteps currentStep={3} />
      <Box sx={{ p: 12 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }} className="grey-text">
            <Typography variant="h5" sx={{ pb: 2 }} className="grey-heading">
              Shipping
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold" }} className="grey-heading">
                Address:
              </Typography>
              <Typography sx={{ pb: 2, ml: 1 }}>{cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}{cart.shippingAddress.code},{' '}{cart.shippingAddress.country}</Typography>
            </Box>
            <Divider />
            <Typography variant="h5" sx={{ pt: 2, pb: 2 }} className="grey-heading">
              Payment Method
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold" }} className="grey-heading">
                Method:
              </Typography>
              <Typography sx={{ pb: 2, ml: 1 }}>{cart.paymentMethod}</Typography>
            </Box>
            <Divider />
            <Typography
              variant="h5"
              sx={{ pt: 2, pb: 2 }}
              className="grey-heading"
            >
              Order Items
            </Typography>
            <Box sx={{ pl: 5, pr: 5 }}>
              {cart.cartItems.map((item) => (
                <>
                    <PlaceOrderCartItems item={item} />
                    <Divider />
                </>
              ))}

            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={2} className="grey-text">
              <Typography variant="h5" sx={{ p: 1.5 }} className="grey-heading">
                Order Summary
              </Typography>
              <Divider />
              <Box sx={{ p: 1.5, display: "flex" }}>
                <Typography sx={{ flex: 0.8 }}>Items:</Typography>
                <Typography>₹ {cart.itemsPrice}</Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 1.5, display: "flex" }}>
                <Typography sx={{ flex: 0.8 }}>Shipping:</Typography>
                <Typography>₹ {cart.shippingPrice}</Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 1.5, display: "flex" }}>
                <Typography sx={{ flex: 0.8 }}>Tax:</Typography>
                <Typography>₹ {cart.taxPrice}</Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 1.5, display: "flex" }}>
                <Typography sx={{ flex: 0.8 }}>Total:</Typography>
                <Typography>₹ {cart.totalPrice}</Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 1.5 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    color: "white",
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "grey" },
                  }}
                  onClick={onContinueClick}
                >
                  Continue
                </Button>
                {isLoading && <Spinner/>}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PlaceOrderFetcher;
