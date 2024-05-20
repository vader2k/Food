import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'


// const generateToken = user => {
//     return jwt.sign({id:user_.id,})
// }

export const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        let user = await UserModel.findOne({email})
        if(user){
            return res.status(400).json({success:false, message:"email already exist"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = bcrypt.hashPassword(password,salt)
        user = new UserModel({
            name,
            email,
            password: hashpassword
        })

        await user.save()
        return res.status(200).json({success:true, message:'registration successful'})
    } catch (error) {
        return res.status(500).json({success:false, message:'failed to register'})
    }
}

// export const login = async (req, res) => {

// }