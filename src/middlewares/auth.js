// Add this to the top of the file
import model from '../db/models';
import UserService from '../services/user';
import jwt from 'jsonwebtoken';
import { roles } from '../roles';

const { User } = model;
 
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
    const { userId, phoneNo, role, exp } = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
   const permission = roles.can(role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    return res.status(500).json({ error: error });
  }
 }
}
 
exports.allowIfHasToken = async (req, res, next) => {
  try {
    const token = jwt.decode(req.headers["x-access-token"]);
    if (!req.headers["x-access-token"])
      return res.status(401).json({ error: "no JWT token provided" });
    if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, phoneNo, role, expiresIn } = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // Check if token has expired
    if (expiresIn < Math.floor(Date.now() / 1000)) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
    } 
    res.locals.loggedInUser = await User.findOne({ raw: true, where: { id:userId } }); next(); 
    } else { 
    next(); 
    } 
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.log("error", error);
    return res.status(500).json({ error: 'server error' });
  }
 }