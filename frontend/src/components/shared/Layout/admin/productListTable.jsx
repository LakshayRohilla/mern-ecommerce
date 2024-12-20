import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  Box
} from '@mui/material';
import Spinner from '../../UI/spinner';
import AlertMessage from '../../UI/alertMessage';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteProductMutation } from '../../../../store/slices/productApiSlice.js';
import { toast } from 'react-toastify';

const ProductListTable = ({products, isLoading, isError, refetch}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        toast.success('Product Deleted Successfully')
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      {/* Table Section */}
      {isLoading ? (
        <Spinner minimumHeight={'10vh'}/>
      ) : isError ? (
        <AlertMessage severity="error">
                {isError?.data?.message || isError.error}
              </AlertMessage>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="product table">
              {/* Table Header */}
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>CATEGORY</TableCell>
                  <TableCell>BRAND</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow key={product._id} hover>
                      <TableCell>{product._id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>₹ {product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell align="center">
                        <Box component={Link} to={`/admin/product/${product._id}/edit`}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ marginRight: '10px' }}
                          >
                            <EditIcon />
                          </Button>
                        </Box>
                        {loadingDelete && <Spinner minimumHeight={"10vh"} />}
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Table Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
};

export default ProductListTable;
