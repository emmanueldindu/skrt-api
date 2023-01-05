import mongoose from 'mongoose';

const connect_url = 'mongodb+srv://emma:chimnadindu@learndev.4sdsu.mongodb.net/socialMedia?retryWrites=true&w=majority';

const connectDB = (url) => {
    return mongoose.connect(connect_url)
}


module.exports = connectDB