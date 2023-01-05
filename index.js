import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import { register } from "./controller/auth.js"
import { verifyToken } from './middleware/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/posts.js'
import {createPost} from './controller/posts.js'
import User from './models/User.js'
import Post from './models/Post.js'

import { users, posts } from './data/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage
});


app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost)


app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)
const PORT = process.env.PORT || 5000;

const connect_url = process.env.MONGO_URL;

const connectDB = (url) => {
    return mongoose.connect(connect_url)
}


const start = async() => {
    try {
       await connectDB()
       app.listen(PORT, () => console.log(`LearnDev app listening on port ${PORT}!`))
        if (connectDB) {
            console.log('connected to MongoDB')
          
          
            // #1c1e21;

            // User.insertMany(users)
            // Post.insertMany(posts)
 }
    } catch (error) {
       console.log(error)
       
    }
 }
 
 start()

// const connectURL = 'mongodb+srv://emma:chimnadindu@learndev.4sdsu.mongodb.net/?retryWrites=true&w=majority'
// mongoose.connect(connectURL, {
//     useNewUrlParse: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     app.listen(PORT, () => console.log(`running on server Port: ${PORT}`))
// }).catch((err) => console.log(`${err} did not connect`))