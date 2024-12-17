import { useGetProductsQuery } from "../../../store/slices/productApiSlice.js";
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductListTable from '../../shared/Layout/admin/productListTable'

const ProductListAdminFetcher = () => {
  const { data: productsData, isLoading, isError } = useGetProductsQuery();
  const products = productsData?.products || [];

  function handleCreateProduct() {

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
        <ProductListTable products={products} isLoading={isLoading} isError={isError}/>
    </Box>
  );
};

export default ProductListAdminFetcher;
