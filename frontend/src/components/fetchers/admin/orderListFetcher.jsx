import { useGetOrdersQuery } from "../../../store/slices/ordersApiSlice";
import Spinner from "../../shared/UI/spinner";
import AlertMessage from "../../shared/UI/alertMessage";
import OrdersListTable from '../../shared/Layout/admin/ordersListTable'
import { Box } from '@mui/material';

const OrderListFetcher = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <Box sx={{m:4}}>
      <h1>Orders</h1>
      {isLoading ? (
        <Spinner minimumHeight={"10vh"} />
      ) : error ? (
        <AlertMessage severity="error">
          {error?.data?.message || error.error}
        </AlertMessage>
      ) : (
        <Box sx={{m:4}}>
         <OrdersListTable orders={orders}/>
         </Box>
      )}
    </Box>
  );
};

export default OrderListFetcher;
