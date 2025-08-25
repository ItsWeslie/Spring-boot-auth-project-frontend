import React, { useState } from 'react';
import google from "/src/assets/images/google.png";
import github from "/src/assets/images/github logo.jpg";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function Login() {

    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleEmailChange = (e) => { setEmail(e.target.value); }
    const handlePasswordChange = (e) => { setPassword(e.target.value); }
    const handleGoogleLogin = () => {window.location.href = "http://localhost:8080/oauth2/authorization/google";}
    const handleGitHubLogin = () => {window.location.href="http://localhost:8080/oauth2/authorization/github";}
   
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        setError("");
        setSuccess("");

        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters, contain uppercase, lowercase, digit, and special character!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/login",{
                email: email,
                password: password
            });

             const { token, role } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            toast.success("Login successful!");

            if (role === "ADMIN") {
                navigate("/admin");
            } else if (role === "USER") {
                navigate("/user");
            } else {
                navigate("/"); 
            }

            setEmail("");
            setPassword("");

            } catch (error) {
            toast.error(error.response?.data || "Invalid credentials!");
            }
    }


  return (
    <>
    <div className='bg-gray-50 flex items-center justify-center min-h-screen font-poppins'>

    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
    <h2 className="text-3xl font-bold text-center text-black mb-6">Login</h2>

    {error && <p className="text-red-500 mb-4">{error}</p>}
    {success && <p className="text-green-500 mb-4">{success}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input 
            type="email" 
            id="email" 
            name="email"
            value={email}
            onChange={handleEmailChange} 
            placeholder='Enter email' required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={handlePasswordChange}
            placeholder='Enter password' required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
      </div>

      <button 
        type="submit" 
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition">
        Login
      </button>

    </form>

    <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?
          <button
            onClick={() => navigate("/signup")}
            className="text-black hover:underline pl-1"
          >
            Register
          </button>
        </p>

    <div className="mt-6 text-center text-gray-500">Or login with</div>

    <div className="mt-4 flex flex-col gap-3">
      <button onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100">
        <img src={google} className="w-5 h-5" alt="Google logo"/>
        <span className="text-sm">Continue with Google</span>
      </button>

      <button onClick={handleGitHubLogin}
        className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100">
        <img src={github} className="w-6 h-6 rounded-full" alt="GitHub logo"/>
        <span className="text-sm">Continue with GitHub</span>
      </button>
    </div>
    
  </div>

  </div>

    </>
  )
}

export default Login
