import express from 'express'
import { register } from '../controllers/authController.js'


const router = express.Router()

router.post('/login', )
router.post('/register', register)

export {router as userRouter}