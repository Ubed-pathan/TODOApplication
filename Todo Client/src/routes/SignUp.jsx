import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password: ''
    })

    function handleChange(e) {
        // const { name, value } = e.target;
        setSignUpData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSignUp(e) {
        console.log("Signup",import.meta.env.VITE_SERVER_API)
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/todo/user/signup`, signUpData);
        if (response.status === 200) {
            setSignUpData({
                username: '',
                email: '',
                password: ''
            });

            setTimeout(() => {
                navigate("/SignIn")
            })
        } else {
            alert("Sign up failed!");
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className=" w-[90%] md:w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl text-center text-custom-blue mb-6">SignUp</h2>

                <form className="space-y-8" onSubmit={handleSignUp}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder=" "
                            required
                            name='username'
                            value={signUpData.username}
                            onChange={handleChange}
                            className="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-custom-blue placeholder-transparent"
                        />
                        <label
                            className="absolute left-0 text-gray-500 top-[-16px] text-xs transition-all duration-200 peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-custom-blue"
                        >
                            Username*
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            placeholder=" "
                            name='email'
                            value={signUpData.email}
                            onChange={handleChange}
                            required
                            className="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-custom-blue placeholder-transparent"
                        />
                        <label
                            className="absolute left-0 text-gray-500 top-[-16px] text-xs transition-all duration-200 peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-custom-blue"
                        >
                            Email*
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder=" "
                            name='password'
                            value={signUpData.password}
                            onChange={handleChange}
                            required
                            className="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-custom-blue placeholder-transparent"
                        />
                        <label
                            className="absolute left-0 text-gray-500 top-[-16px] text-xs transition-all duration-200 peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-custom-blue"
                        >
                            Password*
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-custom-blue transition-colors"
                    >
                        SignUp
                    </button>
                </form>
                <h1 className='mt-10 text-center'>
                    Already have an account: <a className='cursor-pointer text-custom-blue underline' onClick={ () => navigate("/SignIn")}>
                        SignIn
                    </a>
                </h1>
            </div>
        </div>
    );
}

export default SignUp;
