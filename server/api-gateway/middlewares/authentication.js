const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.authenticate = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader?.split(' ')[1];
   if (!token) {
      console.log("token not found")
      res.sendStatus(403);
      return;
   }

   jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
         console.log("token expired")
         res.sendStatus(403);
         return;
      }
      console.log("in api gateway user verified: ", user)
      req.headers['x-user-id'] = user.id;
      req.user = user;
      next();
   });
};