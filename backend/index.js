import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(cors())

app.listen(port, ()=> (
    console.log(`Server is running on port ${port}`)
))