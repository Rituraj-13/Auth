
import express from 'express';
import bcrypt from 'bcrypt';
// import bodyParser from 'body-parser';
import cors from 'cors';
import { signUp } from './database'; // Ensure this import is correct based on your project structure
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(cors()); // Use CORS middleware

app.post('/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!(email && password && confirmPassword)) {
        return res.status(400).send("Provide Email, Password, and Confirm Password");
    }

    const checkEmail = await signUp.findOne({ email });
    if (checkEmail) {
        return res.status(400).send("User already exists with this email");
    }

    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await signUp.create({ email, password: hashedPassword });
        const token = jwt.sign({ email }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
        return res.status(201).send({ token });
    } catch (error) {
        console.error("Error in creating the user or token", error);
        return res.status(500).send("Error in creating the token");
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await signUp.findOne({ email });
        if (!user || !user.password) {
            return res.status(400).send("User not present or password not set");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).send("Wrong Password !!");
        }

        const token = jwt.sign({ email }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
        return res.status(200).send({ token });
    } catch (err) {
        console.error('Error signing in', err);
        return res.status(500).send("Error signing in");
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

