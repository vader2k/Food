import express from 'express'
import { register } from '../controllers/authController.js'


const router = express.Router()

router.get('/login', )
router.get('/register', register)

export {router as userRouter}