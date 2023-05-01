import { Router } from 'express';
import { createUser } from '../model/userModel.js';
import { userExists } from '../model/userModel.js';
import { comparePassword } from '../utils/utils.js';
import { checkRegistration } from '../middleware/userValidation.js';

import jwt from 'jsonwebtoken'

const router = Router();


router.post('/signup', checkRegistration, (req, res) => {
    const credentials = req.body;

    createUser(credentials)

    res.json({sucess: true});
})

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    const user = await userExists(username)
    console.log(user);

    const result = {
         success: false
    }

    if(user) {
        const correctPass = await comparePassword(password, user.password)

        if(correctPass){
            result.success = true;
            
            result.token = jwt.sign({ id: user._id }, 'asd123', { expiresIn: 6000 })
        }
    }

    res.json(result)
})



export default router;