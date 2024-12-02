import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from '../../store/slices/cartSlice';
import CheckoutSteps from '../shared/UI/checkoutSteps';

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

export default function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [code, setCode] = useState(shippingAddress.code || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const [register, { isLoading, isError }] = useRegisterMutation();
  
//   const { userInfo } = useSelector((state) => state.auth);

//   //Here we are taking care of the redirection what we added in the cart fetcher.
//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get('redirect') || '/';

//   // In case we are logged in.
//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   userName: data.get('userName')
    // });
    setAddress(data.get('address'));
    setCity(data.get('city'));
    setCode(data.get('code'));
    setCountry(data.get('country'));

    dispatch(saveShippingAddress({ address, city, code, country }));
    navigate('/payment');

    // try {
    //   console.log(name, email, password);
    //     const res = await register({ name, email, password }).unwrap(); // login from userAPI slice. 
    //     // " await login({ email, password })" will return a promise and we need to unwarp(handle/extract) the resolved promise.
    //     dispatch(setCredentials({ ...res }));
    //     navigate('/');
    //     toast.success("Registration Successful !!!");
    //   } catch (err) {
    //     toast.error(err?.data?.message || err.error);
    //   }
  };

  return (
    <>
      <CheckoutSteps currentStep={1} />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        {/* {isError && <AlertMessage severity="error">Registration Failed !!! </AlertMessage>} */}
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
              {/* {isLoading && <Spinner/>} */}
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LocalShippingIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Shipping
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                  value={address}
                    autoComplete="address"
                    name="address"
                    required
                    fullWidth
                    id="address"
                    label="Enter address"
                    autoFocus
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  value={city}
                    required
                    fullWidth
                    id="city"
                    label="Enter city"
                    name="city"
                    autoComplete="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  value={code}
                    required
                    fullWidth
                    id="code"
                    label="Postal Code"
                    name="code"
                    autoComplete="code"
                    onChange={(e) => setCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  value={country}
                    required
                    fullWidth
                    id="country"
                    label="Enter country"
                    name="country"
                    autoComplete="country"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' }}}
                  // disabled={isLoading}
                >
                  Continue
                </Button>
              {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  <Box component={Link} to={redirect ? `/login?redirect=${redirect}` : '/login'} sx={{ color: 'inherit', textDecoration: 'none', cursor:'pointer', '&:hover': { color: 'grey' }}}variant="body2" >
                      {"Already have an account? Log in"}
                  </Box>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}