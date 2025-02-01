import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  // console.log(authHeader)
  // const token = authHeader && authHeader.split(' ')[1];
  console.log(token)

  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;

    next();
  });
};

export default authenticateToken;

