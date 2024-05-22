import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = async () => {
        if (!(email && password)) {
            alert("Enter email and password !")
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/signin', {
                email: email,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data.token) {
                const token = `Bearer ${response.data.token}`;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = token;
                navigate('/protected')
            }
        } catch (error) {
            
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="outer bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Signin</h2>
                <div className="form-group mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input type="email" id="username" className="form-control border border-gray-300 rounded-lg w-full p-3" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className="form-group mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input type="password" id="password" className="form-control border border-gray-300 rounded-lg w-full p-3" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <button className="bg-blue-500 text-white font-semibold rounded-lg w-full py-3"
                onClick={handleClick}>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Signin;
