import React, { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authState }from '../Atoms';

function SignIn() {
    const navigate = useNavigate();
    const setAuthState = useSetRecoilState(authState);
    const[signInData, setSignInData] = useState({
        username:'',
        password:'',
    })

    function handleChange(e){
        const{name, value} = e.target;
        setSignInData({
            ...signInData,
            [name] : value,
        });
    }

    async function handleSignIn(e) {
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/todo/user/signin`, signInData,{
            withCredentials : true
        });

        if(response.status == 200){
            setAuthState({
                isLoggedIn: true,
                userName: response.data.username,
            });
            setSignInData({
                username: '',
                password: ''
            });
            setTimeout(() => {
                navigate("/")
            })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-[90%] md:w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl text-center text-custom-blue mb-6">SignIn</h2>

                <form className="space-y-8" onSubmit={handleSignIn}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder=" "
                            required
                            name='username'
                            value={signInData.username}
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
                            type="password"
                            placeholder=" "
                            required
                            name='password'
                            value={signInData.password}
                            onChange={handleChange}
                            className="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-custom-blue placeholder-transparent"
                        />
                        <label
                            className="absolute left-0 text-gray-500 top-[-16px] text-xs transition-all duration-200 peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-custom-blue"
                        >
                            Password*
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-custom-blue transition-colors"
                    >
                        SignIn
                    </button>
                </form>
                <h1 className='mt-10 text-center'>
                    Don't have an account: <a className='cursor-pointer text-custom-blue underline' onClick={ () => navigate("/SignUp")}>
                        SignUp
                    </a>
                </h1>
            </div>
        </div>
    );
}

export default SignIn;
