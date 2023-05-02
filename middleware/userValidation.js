import jwt from 'jsonwebtoken'
import { userExists } from '../model/userModel.js';
import { getSecret } from '../secretManager.js';

const secret = getSecret()
const verify = async (req, res, next) => {

    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        
        const data = await jwt.verify(token, secret);

        req.token = token;
        req.id = data.id;
        next()

    } catch (error) {
        res.json({ 
            success: false,
            error: 'Not valid token' })
    }
}

async function checkRegistration(req, res, next) {
    const { body } = req;
  
    if (!body?.username || !body?.password) {
      return res.status(400).json({ success: false, message: 'Username or password missing in body' });
    }
  
    const exists = await userExists(body.username);
  
    if (exists) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }
  
    next();
  }




export {verify, checkRegistration}