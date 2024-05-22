import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL as string);

const signupSchema = new mongoose.Schema({
    email: String,
    password: String
})
const signUp = mongoose.model('credentials', signupSchema);

export {
    signUp
}