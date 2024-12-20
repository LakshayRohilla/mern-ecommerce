import { useGetProductsQuery, useCreateProductMutation } from "../../../store/slices/productApiSlice.js";
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductListTable from '../../shared/Layout/admin/productListTable'
import { toast } from 'react-toastify';
import Spinner from "../../shared/UI/spinner";

const ProductListAdminFetcher = () => {
  const { data: productsData, isLoading, isError, refetch } = useGetProductsQuery();
  const products = productsData?.products || [];

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  async function handleCreateProduct() {
    if (window.confirm('Are you sure you want to create a new product?')) {
        try {
          await createProduct();
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
  }

  return (
    <Box sx={{m:5}}>
        <Box>
        <h1>Listed Products</h1>
        <Button onClick={handleCreateProduct}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' }, float: 'right'}}
            >
              Create Product
            </Button>
        </Box>
        { loadingCreate && <Spinner minimumHeight={"10vh"} /> }
        <ProductListTable products={products} isLoading={isLoading} isError={isError} refetch={refetch}/>
    </Box>
  );
};

export default ProductListAdminFetcher;
