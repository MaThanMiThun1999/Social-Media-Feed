const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const { JWT_SECRET } = require('../config/envConfig');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('token: ', token);
  console.log('Request Headers:', req.headers); 
  console.log('Request Cookies:', req.cookies);
  console.log('token from cookies: ', token);

  if (!token) {
    console.log('Token not found in cookies');
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - No token provided', success: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('decoded: ', decoded);

    if (!decoded || typeof decoded !== 'object') {
      console.log('decoded: ', decoded);
      return res
        .status(401)
        .json({ message: 'Unauthorized - Invalid token', success: false });
    }

    const user = await userModel.findById(decoded.userID);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - User not found', success: false });
    }

    req.user = user;
    req.userID = decoded.userID; 
    next();
  } catch (error) {
    console.log(`Error verifying token: ${error.message}`);
    return res
      .status(401)
      .json({ message: 'Unauthorized - Invalid token', success: false });
  }
};

module.exports = authMiddleware;

