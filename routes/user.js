import { Router } from 'express';
import { createUser } from '../model/userModel.js';
import { userExists } from '../model/userModel.js';
import { comparePassword } from '../utils/utils.js';
import { checkRegistration } from '../middleware/userValidation.js';
import { getSecret } from '../secretManager.js';

import jwt from 'jsonwebtoken'

const router = Router();
const secret = getSecret()

router.post('/user/signup', checkRegistration, (req, res) => {
    const credentials = req.body;
    createUser(credentials)
    

    res.json({success: true});

    /*#swagger.requestBody = { required: true, 
        content: { "application/json": {
            schema: {
                $ref: "#/definitions/authModel"
            }
        } 
    }    
    }
    
    #swagger.responses[200] = {
        description: "Bra",
                content: { "application/json": {
            schema: {
                $ref: "#/definitions/authResponse"
            }
        } 
    }
    */
})

router.post('/user/login', async (req, res)=>{
    const {username, password} = req.body;

    const user = await userExists(username)

    const result = {
         success: false
    }

    if(user) {
        const correctPass = await comparePassword(password, user.password)

        if(correctPass){
            result.success = true;
            
            result.token = jwt.sign({ id: user._id }, secret, { expiresIn: 6000 })
        }
    }

    
    res.json(result)

    /*    #swagger.responses[200] = {
        description: "Bra",
                content: { "application/json": {
            schema: {
                $ref: "#/definitions/authResponse"
            }
        } 
    }
    */
})



export default router;

