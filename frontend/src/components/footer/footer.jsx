import React from 'react';
import { Container, Grid, Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We provide quality services to ensure your needs are met. Contact us for more information.
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            <Link href="#" color="inherit" variant="body2" display="block">
              Home
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block">
              Services
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block">
              Contact
            </Link>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: info@example.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 234 567 890
            </Typography>
            <Typography variant="body2">
              Address: 123 Street Name, City, Country
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            © {new Date().getFullYear()} E-Commerce. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
