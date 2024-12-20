import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../../store/slices/userApiSlice.jsx";
import {
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  Grid,
  Container,
  CssBaseline,
  Avatar,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Spinner from "../../shared/UI/spinner";
import AlertMessage from "../../shared/UI/alertMessage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Box
        component={Link}
        to="/"
        sx={{
          color: "black",
          textDecoration: "none",
          cursor: "pointer",
          "&:hover": { color: "grey" },
        }}
        variant="body2"
      >
        <u>MERN E-Commerce</u>
      </Box>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const UserEditFetcher = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setIsAdmin(user.isAdmin || false);
    }
  }, [user]);

  return (
    <Box sx={{ m: 4 }}>
      <Button
        variant="contained"
        component={Link}
        endIcon={<FormatListBulletedIcon />}
        sx={{
          color: "white",
          backgroundColor: "black",
          "&:hover": { backgroundColor: "grey" },
        }}
        to="/admin/userlist"
      >
        Go Back to List
      </Button>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit User
            </Typography>
            {loadingUpdate && <Spinner minimumHeight={"10vh"} />}
            {isLoading ? (
              <Spinner minimumHeight={"10vh"} />
            ) : error ? (
              <AlertMessage severity="error">
                {error?.data?.message || error.error}
              </AlertMessage>
            ) : (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      value={name}
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Enter Name"
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={email}
                      required
                      fullWidth
                      id="email"
                      label="Enter Email"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Is Admin"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    color: "white",
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "grey" },
                  }}
                >
                  Update User
                </Button>
              </Box>
            )}
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default UserEditFetcher;
