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
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const UserListTable = ({ users, isLoading, isError, refetch }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteHandler = async (id) => {
    // if (window.confirm('Are you sure you want to delete this user?')) {
    //   try {
    //     console.log('Delete user:', id);
    //     toast.success('User deleted successfully');
    //     refetch();
    //   } catch (err) {
    //     toast.error(err?.data?.message || err.error);
    //   }
    // }
  };

  return (
    <>
      {isLoading ? (
        <Spinner minimumHeight={'10vh'} />
      ) : isError ? (
        <AlertMessage severity="error">
          {isError?.data?.message || isError.error}
        </AlertMessage>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>ADMIN</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user._id} hover>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </TableCell>
                      <TableCell>
                        {user.isAdmin ? (
                          <CheckIcon style={{ color: 'green' }} />
                        ) : (
                          <CloseIcon style={{ color: 'red' }} />
                        )}
                      </TableCell>
                      {!user.isAdmin && 
                      <TableCell align="center">
                        <Box
                          component={Link}
                          to={`/admin/user/${user._id}/edit`}
                          style={{ marginRight: '10px' }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                          >
                            <EditIcon />
                          </Button>
                        </Box>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell> }
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
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

export default UserListTable;
