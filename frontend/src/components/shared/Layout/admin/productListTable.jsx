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

const ProductListTable = ({products, isLoading, isError}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteHandler = (id) => {
    console.log(`Delete product with ID: ${id}`);
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
