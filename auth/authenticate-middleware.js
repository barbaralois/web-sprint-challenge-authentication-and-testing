/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        //something is wrong with the token
        res.status(401).json({
          message: 'Please sign-in again to validate your credentials.',
        });
      } else {
        // token is good, we can see the data in the decoded token
        req.jwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Please sign in to access this page.' });
  }
};
