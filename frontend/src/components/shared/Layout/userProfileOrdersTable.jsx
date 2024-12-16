import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Main component
const UserProfileOrdersTable = ({ orders }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
            <StyledTableCell align="center">Paid</StyledTableCell>
            <StyledTableCell align="center">Delivered</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order._id}>
              <StyledTableCell component="th" scope="row">
                {order._id}
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.createdAt.substring(0, 10)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.totalPrice}
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <CloseIcon sx={{ color: 'red' }} />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <CloseIcon sx={{ color: 'red' }} />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`/order/${order._id}`}>Details</Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserProfileOrdersTable;
