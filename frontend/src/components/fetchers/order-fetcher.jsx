import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery } from "../../store/slices/ordersApiSlice";
import OrderDetails from '../shared/Layout/orderDetails';
import AlertMessage from "../shared/UI/alertMessage";
import Spinner from "../shared/UI/spinner";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from "react";
import { useSelector } from "react-redux";

const OrderFetcher = () => {
  const { oid } = useParams();
  const {data: orderDetails, isLoading, isError } = useGetOrderDetailsQuery(oid);
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


  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <AlertMessage severity="error" marBot={45}>
      {isError?.data?.message || isError.error || "Order not found !!"}
    </AlertMessage>
  ) : (
    <OrderDetails orderDetails={orderDetails}/>
  );
};

export default OrderFetcher;