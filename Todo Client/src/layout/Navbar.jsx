import {react, useEffect} from 'react'
import { Link } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { authState } from "../Atoms";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const setAuthState = useSetRecoilState(authState);

  async function handleLogout(){
    const response = await axios.post("http://localhost:8081/todo/user/logout",{},{
        withCredentials: true
    })
    if(response.status == 200){
        setAuthState({
            isLoggedIn: false,
            userName: null,
        });
        setTimeout(() => {
            navigate("/SignIn")
        })

    }
  }
  return (
    <>
      <nav className="bg-custom-blue p-6 fixed top-0 left-0 w-full z-10">
        <ul className="flex flex-row justify-between md:gap-10 md:justify-center text-custom-gray text-lg">
          <li>
            <div className="flex flex-row gap-2">
              <LuListTodo size={30} className="text-black" />
              <div className="hidden md:block md:text-xl text-black">TODO LIST</div>
            </div>
          </li>
          <li>
            <Link to="/"className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Completed" className="hover:underline">
              Completed
            </Link>
          </li>
          {auth.isLoggedIn ? (
            <>
              <li>
                <Link className="hover:underline" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/SignUp" className="hover:underline">
                  SignUp
                </Link>
              </li>
              <li>
                <Link to="/SignIn" className="hover:underline">
                  SignIn
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;  