import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="add the yogantaram">
        Yogantaram
      </Link> */}
      MERN E-Commerce {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email =  data.get('email');
    const password = data.get('password');
    console.log(email, password);
    // try{
    //   const response = await axios.post('http://localhost:5000/login', { email, password });

    //   if (response.statusText==="OK") {
    //     dispatch(authActions.login({token: response.data.token}));
    //     // setToken(response.data.token); // the way in the course
    //     navigate('/'); // Redirect to the home route
    //   }

    // } catch(err) {
    //   setError(err.response?.data?.message + ' ' + err);
    //   setOpen(true);
    // }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' }}}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Box component={Link} variant="body2" sx={{ color: 'inherit', textDecoration: 'none', cursor:'pointer', '&:hover': { color: 'grey' }}}>
                    Forgot password?
                  </Box>
                </Grid>
                <Grid item>
                  <Box component={Link} sx={{ color: 'inherit', textDecoration: 'none', cursor:'pointer', '&:hover': { color: 'grey' }}} to='/signup' variant="body2" >
                    {"Don't have an account? Sign Up"}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}