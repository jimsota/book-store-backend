// const jwt = require('jsonwebtoken')
// const JWT_SECRET = process.env.JWT_SECRET_KEY

// const verifyAdminToken = (req, res, next) => {
//    const token = req.headers['authorization']?.split(' ')[1]

//    console.log(token)

//    if (!token) {
//       return res.status(401).json({ message: 'Access Denied. No token provided' })
//    }
//    jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//         return res.status(403).json({ message: 'Invalid credentials' })
//     }
//     req.user = user
//     next()
//    })
// }
// module.exports = verifyAdminToken


const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
   const authHeader = req.headers.authorization;

   console.log("Received Header:", authHeader)

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
   message: 'Access denied. No token provided'
      });
   }
   const token = authHeader.split(' ')[1];
   console.log("token being verified:", token);

   jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err)  {
         console.log("JWT Error:", err.message);
         return res.status(403).json({ message: 'Invalid credentials'})
      }

      console.log("Decoded User:", decoded)

      if (!decoded.role || decoded.role.toLowerCase() !== 'admin') {
         return res.status(403).json({ message: 'Admin access required' })
      }

   req.user = decoded;
   next(); 

   })
}

module.exports = verifyAdminToken;