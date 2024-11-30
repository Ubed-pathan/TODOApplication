import React from 'react'
import { Link } from 'react-router-dom';
import { LuListTodo } from "react-icons/lu";

function Navbar() {
  return (
    <>
        <nav className='bg-custom-blue p-6 fixed top-0 left-0 w-full z-10'>
            <ul className='flex flex-row gap-10 justify-center text-custom-gray text-lg'>
                <li>
                    <div className='flex flex-row gap-2'>
                    <LuListTodo size={30} className='text-black'/> 
                        <div className='text-xl text-black'>TODO LIST</div>     
                    </div>
                </li>
                <li>
                    <Link to='/' className='hover:underline'>Home</Link>
                </li>
                <li>
                <Link to='/Completed' className='hover:underline' >Completed</Link>
                </li>
                <li>
                <Link to='/SignUp' className='hover:underline' >SignUp</Link>
                </li>
                <li>
                <Link to='/SignIn' className='hover:underline' >SignIn</Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar