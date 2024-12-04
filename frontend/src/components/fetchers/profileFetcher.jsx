import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AlertMessage from "../shared/UI/alertMessage";
import Spinner from "../shared/UI/spinner";
import { useProfileMutation } from "../../store/slices/userApiSlice";
// import { useGetMyOrdersQuery } from "../../store/slices/ordersApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import { TextField, Box, Button, Typography } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

const ProfileFetcher = () => {
  const { userInfo } = useSelector((state) => state.auth);
  //   const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure userInfo is available on initial render
    if (!userInfo) toast.error("User information not available");
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // console.log(name, email);
    // console.log(userInfo?.userId);
    // console.log(`user id is not there : ${userInfo?._id}`);

    try {
      const res = await updateProfile({_id: userInfo.userId, name, email, password}).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box sx={{m:4, pr:4, pl:5.2}}>
      <Typography variant="h4" gutterBottom className="grey-heading">
        User Profile
      </Typography>
      <Box
        component="form"
        onSubmit={submitHandler}
        noValidate
        sx={{ display: "flex", flexDirection: "column", m: 3, gap: 2 }}
      >
        <TextField
          required
          autoFocus
          fullWidth
          name="name"
          label="Name"
          type="text"
          autoComplete="name"
          defaultValue={userInfo?.name || ""}
        />
        <TextField
          required
          name="email"
          autoComplete="email"
          label="Email Address"
          type="text"
          defaultValue={userInfo?.email || ""}
        />
        <TextField required name="password" label="Password" type="password" />
        <TextField
          required
          name="confirmPassword"
          label="Confirm Password"
          type="password"
        />
        <Button
          variant="contained"
          endIcon={<PublishIcon />}
          sx={{
            color: "white",
            backgroundColor: "black",
            "&:hover": { backgroundColor: "grey" },
          }}
          type="submit"
        >
          Update
        </Button>
        {loadingUpdateProfile && <Spinner minimumHeight={'10vh'}/>}
      </Box>
    </Box>
  );
};

export default ProfileFetcher;
