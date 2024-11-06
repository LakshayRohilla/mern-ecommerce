const jwt = require ('jsonwebtoken');

const generateToken = (res, userId, email) => { // Here second param is payload
  const token = jwt.sign({ userId, email }, 
    process.env.JWT_SECRET, // keep in mind for the login and signup keys should be the same.
    {expiresIn: '1hr'}
);

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, { // here jwt is the cookie name.
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    // we always keep the secure to true to have the https, but not in the development
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 3600000, // 1 hr
  });
};

module.exports = generateToken;