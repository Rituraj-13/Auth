"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DATABASE_URL);
const signupSchema = new mongoose_1.default.Schema({
    email: String,
    password: String
});
const signUp = mongoose_1.default.model('credentials', signupSchema);
exports.signUp = signUp;
