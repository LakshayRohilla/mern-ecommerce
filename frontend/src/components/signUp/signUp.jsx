import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../shared/UI/alertMessage";
import { useRegisterMutation } from "../../store/slices/userApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import Spinner from "../shared/UI/spinner";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {/* <Link color="inherit" to="/">
        Yogantaram
      </Link> */}
      <Box component={Link} to="/" sx={{ color: 'black', textDecoration: 'none', cursor:'pointer', '&:hover': { color: 'grey' }}}variant="body2" >
                 <u>   MERN E-Commerce</u>
        </Box>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignUp() {
//   const [error, setError] = useState();
//   const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading, isError }] = useRegisterMutation();
  
  const { userInfo } = useSelector((state) => state.auth);

  //Here we are taking care of the redirection what we added in the cart fetcher.
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // In case we are logged in.
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   userName: data.get('userName')
    // });
    const name = data.get('name');
    const email =  data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    // try{
    //   const response = await axios.post('http://localhost:5000/signup', { userName, email, password });
    //   console.log(response);
    //   alert("Sign up successfull !!!!");
    //   if (response.statusText==="Created") {
    //     dispatch(authActions.login({token: response.data.token}));
    //     navigate('/'); // Redirect to the home route
    //   }
    // } catch (err){
    //   setError(err.response?.data?.message + ' ' + err);
    //   setOpen(true);
    // }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match!!!');
        return;
      } else {
    try {
      console.log(name, email, password);
        const res = await register({ name, email, password }).unwrap(); // login from userAPI slice. 
        // " await login({ email, password })" will return a promise and we need to unwarp the resolved promise.
        dispatch(setCredentials({ ...res }));
        navigate('/');
        toast.success("Registration Successful !!!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

//   const errorHandler = () => {
//     setError(null);
//     setOpen(false);
//   };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      {/* <ErrorModal open={open} errorMessage={error} handleClose={errorHandler} /> */}
      {isError && <AlertMessage severity="error">Registration Failed !!! </AlertMessage>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            {isLoading && <Spinner/>}
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' }}}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Box component={Link} to={redirect ? `/login?redirect=${redirect}` : '/login'} sx={{ color: 'inherit', textDecoration: 'none', cursor:'pointer', '&:hover': { color: 'grey' }}}variant="body2" >
                    {"Already have an account? Log in"}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}