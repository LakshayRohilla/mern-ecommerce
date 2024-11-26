// import { Link, useParams } from "react-router-dom";
import AlertMessage from "../UI/alertMessage";
import Spinner from "../UI/spinner";
import { Box, Paper, Button, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlaceOrderCartItems from '../Layout/placeOrderCartItems';

const OrderDetails = ({orderDetails}) => {
    let displayName = orderDetails?.order?.user?.name;
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    return (

        <Box sx={{ p: 12 }}>
            <Typography variant='h4' className="grey-heading" sx={{mb:2}}>Order : {orderDetails?.order?.id}</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }} className="grey-text">
            <Typography variant="h5" sx={{ pb: 2 }} className="grey-heading">
              Shipping
            </Typography>
            <Box>
              <Typography sx={{ fontWeight: "bold" }} className="grey-heading">
                Name:
              </Typography>
              <Typography sx={{ pb: 2, ml: 1 }}>{displayName}</Typography>
              <Typography sx={{ fontWeight: "bold" }} className="grey-heading">
                Email:
              </Typography>
              <Typography sx={{ pb: 2, ml: 1 }}>{orderDetails?.order?.user?.email}</Typography>
              <Typography sx={{ fontWeight: "bold" }} className="grey-heading">
                Address:
              </Typography>
              <Typography sx={{ pb: 2, ml: 1 }}>{orderDetails?.order?.shippingAddress?.address}</Typography>
            </Box>
            {orderDetails?.order?.isDelivered === false && 
                <Box sx={{m:-6}}>
                    <AlertMessage severity="error" >
                        Not Delivered
                    </AlertMessage>
                </Box>
            }
            <Divider />
            <Typography variant="h5" sx={{ pt: 2, pb: 2 }} className="grey-heading">
              Payment Method
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold" }} className="grey-heading">
                Method:
              </Typography>
              <Typography sx={{ pb: 2, ml: 1 }}>{orderDetails?.order?.paymentMethod}</Typography>
            </Box>
            {orderDetails?.order?.isPaid === false && 
                <Box sx={{m:-6}}>
                    <AlertMessage severity="error" >
                        Not Paid
                    </AlertMessage>
                </Box>
            }
            <Divider />
            <Typography
              variant="h5"
              sx={{ pt: 2, pb: 2 }}
              className="grey-heading"
            >
              Order Items
            </Typography>
            <Box sx={{ pl: 5, pr: 5 }}>
              {orderDetails?.order?.orderItems.map((item) => (
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
                <Typography>₹ {orderDetails?.order?.itemsPrice}</Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 1.5, display: "flex" }}>
                <Typography sx={{ flex: 0.8 }}>Shipping:</Typography>
                <Typography>₹ {orderDetails?.order?.shippingPrice}</Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 1.5, display: "flex" }}>
                <Typography sx={{ flex: 0.8 }}>Tax:</Typography>
                <Typography>₹ {orderDetails?.order?.taxPrice}</Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 1.5, display: "flex" }}>
                <Typography sx={{ flex: 0.8 }}>Total:</Typography>
                <Typography>₹ {orderDetails?.order?.totalPrice}</Typography>
              </Box>
              <Divider />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
}

export default OrderDetails;