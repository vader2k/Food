import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'


const generateToken = user => {
    return jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '7days'
    })
}

export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        let user = await UserModel.findOne({email})
        if(user){
            return res.status(400).json({success:false, message:"email already exist"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        user = new UserModel({
            username,
            email,
            password: hashedPassword,
        })

        await user.save()
        return res.status(200).json({success:true, message:'registration successful'})
    } catch (error) {
        return res.status(500).json({success:false, message: error.message})
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        let user = await UserModel.findOne({username})

        if(!user){
            return res.status(400).json({success:false, message:"user does not exist"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({success:false, message:"invalid password"})
        }
        const token = generateToken(user)
        return res.status(200).json({success:true, 
            token, 
            userID: user._id,
            message: "login successful"
        })

    } catch (error) {
        console.error(error.message)
    }
}

export const verify = (req, res, next) => {
    const authToken = req.headers.authorization

   if(!authToken || !authToken.startsWith('Bearer ')){
    return res.status(401).json({success:false, message:"no token, authorization denied"})
   }

   try {
    const token = authToken.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userID = decoded.id;
    next();
   } catch (error) {
    if (error.name === "TokenExpiredError"){
        return res.status(403).json({success:false, message:"token expired"})
    }
    return res.status(401).json({success:false, message:"invalid token"})
   }
}