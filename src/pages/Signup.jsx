import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {

    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    const[role,setRole] = useState("");
    const[passwordStrength,setPasswordStrength]= useState("");

    const handleEmailChange = (e) => {setEmail(e.target.value);}
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    }
    const handleConfirmPasswordChange = (e) => { setConfirmPassword(e.target.value);}
    const handleRoleChange = (e) => {setRole(e.target.value);}


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const checkPasswordStrength = (pwd) => {
            if (pwd.length < 6) {
            setPasswordStrength("Weak ❌");
            } else if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(pwd) &&
            !passwordRegex.test(pwd)
            ) {
            setPasswordStrength("Medium ⚠️");
            } else if (passwordRegex.test(pwd)) {
            setPasswordStrength("Strong ✅");
            } else {
            setPasswordStrength("");
            }
        };
    
    const handleSubmit = async (e) =>{

        e.preventDefault()
        
        if(password!==confirmPassword)
        {
            toast.error("Passwords do not match!");
            return;
        }

        if (!passwordRegex.test(password)) {
            toast.error(
            "Password must be at least 8 characters, contain uppercase, lowercase, digit, and special character!"
            );
            return;
        }

        if (!role) {
        toast.error("Please select a role!");
        return;
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/signup",{
                email: email,
                password: password,
                role: role
            });

            if (response.status === 201) {
                toast.success(response.data || "Signup successful!");

                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setRole("");
                setPasswordStrength("");
            } else {
                toast.error(response.data || "Something went wrong!");
            }

        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data);
            } else {
                toast.error("Server error. Please try again later.");
            }
        }
    }
  return (
      <>
    
    <div className='bg-gray-50 flex items-center justify-center min-h-screen font-poppins'>
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
    <h2 className="text-3xl font-bold text-center text-black mb-6">Sign-up</h2>

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
            {password && (
              <p
                className={`mt-1 text-sm ${
                  passwordStrength.includes("Weak")
                    ? "text-red-500"
                    : passwordStrength.includes("Medium")
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Strength: {passwordStrength}
              </p>
            )}
      </div>

      <div>
        <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input 
            type="password" 
            id="confirmpassword" 
            name="confirmpassword" 
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder='Confirm password' required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
        </div>

        <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Select role</label>
            <select 
                name="role" 
                id="role" 
                value={role}
                onChange={handleRoleChange}
                className='w-full mt-1 py-2 px-2 rounded-md border'
                required>

                <option value="">-- Select Role --</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>

            </select>
        </div>

         <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <button
            onClick={() => navigate("/")}
            className="text-black hover:underline pl-1"
          >
            Login
          </button>
        </p>

        <button 
        type="submit" 
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition">
        Sign up
      </button>
      </form>
      </div>
            <ToastContainer position="top-center" autoClose={3000} />
      </div>
     </>
  )
}

export default Signup
