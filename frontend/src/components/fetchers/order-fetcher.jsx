import { useParams } from "react-router-dom";
import OrderDetails from '../shared/Layout/orderDetails';
import AlertMessage from "../shared/UI/alertMessage";
import Spinner from "../shared/UI/spinner";
import { useGetOrderDetailsQuery } from '../../store/slices/ordersApiSlice';

const OrderFetcher = () => {
  const { oid } = useParams();
  const {data: orderDetails, refetch, isLoading, isError } = useGetOrderDetailsQuery(oid);

  console.log(orderDetails)

  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <AlertMessage severity="error" marBot={45}>
      {isError?.data?.message || isError.error || "Order not found !!"}
    </AlertMessage>
  ) : (
    <OrderDetails orderDetails={orderDetails} orderId={oid} refetch={refetch}/>
  );
};

export default OrderFetcher;