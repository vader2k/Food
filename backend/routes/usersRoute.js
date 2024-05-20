import express from 'express'
import { register } from '../controllers/authController'


const router = express.Router()

router.get('/login', )
router.get('/register', register)

export {router as userRouter}