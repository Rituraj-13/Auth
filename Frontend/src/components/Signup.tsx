import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClick = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/signup', {
                email: email,
                password: password,
                confirmPassword: confirmPassword // Add confirmPassword to the request body
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data.token) {
                const token = `Bearer ${response.data.token}`;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = token;
                navigate('/protected');
            }
            
        } catch (error) {
            console.error("There was an error signing up!", error);
            alert("Error during signup, please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="outer bg-white shadow-md rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input type="email" id="email" className="form-control border border-gray-300 rounded-lg w-full p-3" placeholder="Enter email address"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input type="password" id="password" className="form-control border border-gray-300 rounded-lg w-full p-3" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                        Confirm Password
                    </label>
                    <input type="password" id="confirmPassword" className="form-control border border-gray-300 rounded-lg w-full p-3" placeholder="Re-enter password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button className="bg-blue-500 text-white font-semibold rounded-lg w-full py-3"
                    onClick={handleClick}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}
