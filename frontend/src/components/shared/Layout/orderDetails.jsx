import { Link, useParams } from "react-router-dom";
import AlertMessage from "../UI/alertMessage";
import { Box, Paper, Divider, Typography, Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlaceOrderCartItems from '../Layout/placeOrderCartItems';
import Spinner from '../UI/spinner'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery } from '../../../store/slices/ordersApiSlice'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { toast } from "react-toastify";

const OrderDetails = ({orderDetails, orderId, refetch}) => {
    let displayName = orderDetails?.order?.user?.name;
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();
    const { userInfo } = useSelector((state) => state.auth);
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    useEffect(() => {
      if (!errorPayPal && !loadingPayPal && paypal.clientId) {
        const loadPaypalScript = async () => {
          paypalDispatch({ // This is all taken from the documentation.
            type: 'resetOptions',
            value: {
              'client-id': paypal.clientId,
              currency: 'USD',
            },
          });
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        };
        if (orderDetails && !orderDetails.isPaid) {
          if (!window.paypal) {
            loadPaypalScript();
          }
        }
      }
    }, [errorPayPal, loadingPayPal, orderDetails, paypal, paypalDispatch]);

    function onApprove(data, actions) {
      // Below action triggers the paypal.
      return actions.order.capture().then(async function (details) { // this you can have from the documentation. "details comes from paypal"
        try {
          await payOrder({ orderId, details });
          refetch(); // calling refetch to update the status we are displaying as "not paid".
          toast.success('Order is paid');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      });
    }

    async function onApproveTest() {
      await payOrder({ orderId, details: { payer: {} } });
      refetch();
      toast.success('Order is paid');
    }

    function onError(err) {
      toast.error(err.message);
    }
    function createOrder(data, actions) {
      return actions.order // actions have bunch of order in it.
        .create({
          purchase_units: [
            {
              amount: { value: orderDetails?.order?.totalPrice },
            },
          ],
        })
        .then((orderID) => {
          return orderID;
        });
    }

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
            {orderDetails?.order?.isPaid === true && 
                <Box sx={{m:-6}}>
                    <AlertMessage severity="success" >
                        Paid on {orderDetails?.order?.paidAt} 
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

              {/* PAY ORDER PLACEHOLDER */}
              {!orderDetails?.order?.isPaid && ( <>
                  {loadingPay && <Spinner minimumHeight={'10vh'}/>}
                  {isPending ? (
                    <Spinner minimumHeight={'10vh'}/>
                  ) : (
                    <Box>
                      <Box sx={{display:'flex', justifyContent:'center', pb:1.5, pt:2}}>
                        <Button onClick={onApproveTest}
                            variant="contained"
                            endIcon={<NavigateNextIcon />}
                            sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' } }}
                          >
                            Test Pay Order
                        </Button>
                      </Box>
                      <Box sx={{mr:2, ml:2}}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </Box>
                    </Box>
                  )}
                  </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
}

export default OrderDetails;