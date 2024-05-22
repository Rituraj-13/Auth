"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database"); // Ensure this import is correct based on your project structure
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)()); // Use CORS middleware
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword } = req.body;
    if (!(email && password && confirmPassword)) {
        return res.status(400).send("Provide Email, Password, and Confirm Password");
    }
    const checkEmail = yield database_1.signUp.findOne({ email });
    if (checkEmail) {
        return res.status(400).send("User already exists with this email");
    }
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield database_1.signUp.create({ email, password: hashedPassword });
        const token = jsonwebtoken_1.default.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.status(201).send({ token });
    }
    catch (error) {
        console.error("Error in creating the user or token", error);
        return res.status(500).send("Error in creating the token");
    }
}));
app.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield database_1.signUp.findOne({ email });
        if (!user || !user.password) {
            return res.status(400).send("User not present or password not set");
        }
        const checkPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).send("Wrong Password !!");
        }
        const token = jsonwebtoken_1.default.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).send({ token });
    }
    catch (err) {
        console.error('Error signing in', err);
        return res.status(500).send("Error signing in");
    }
}));
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
