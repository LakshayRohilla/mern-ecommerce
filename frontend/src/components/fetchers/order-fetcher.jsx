import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../store/slices/ordersApiSlice";
import OrderDetails from '../shared/Layout/orderDetails';
import AlertMessage from "../shared/UI/alertMessage";
import Spinner from "../shared/UI/spinner";

const OrderFetcher = () => {
  const { oid } = useParams();
  const {
    data: orderDetails,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(oid);

  console.log(orderDetails);

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