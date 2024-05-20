import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { userRouter } from './routes/usersRoute.js'

dotenv.config()
const port = process.env.PORT || 8000
const app = express()
app.get('/', (req, res) => {
    res.send('Server is up')
})


//middlewares
app.use(express.json())
app.use(cors({
    origin: true 
}))

//database connection
mongoose.set('strictQuery', false)
const connectedDB = async() => {
	try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
		console.log("mongoDB databse is connected")
    } catch (error) {
        console.log(error)
    }
}

//end point or routes
app.use('/api/v1/auth', userRouter)


app.listen(port, ()=> {
	connectedDB()
    console.log(`Server is running on port ${port}`)
})