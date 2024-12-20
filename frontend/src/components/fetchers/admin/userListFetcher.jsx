import { useGetUsersQuery } from "../../../store/slices/userApiSlice";
import UserListTable from "../../shared/Layout/admin/userListTable";
import { Box } from '@mui/material';

const UserListFetcher = () => {
  const { data: users, refetch, isLoading, isError } = useGetUsersQuery();
  return (
    <Box sx={{ m: 5 }}>
      <Box>
        <h1>Users List</h1>
        <UserListTable
          users={users}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />
      </Box>
    </Box>
  );
};

export default UserListFetcher;
