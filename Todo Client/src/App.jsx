import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from './Atoms';
import Navbar from './layout/Navbar';
import Home from './routes/Home';
import Completed from './routes/Completed';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function ProtectedRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/SignIn" />;
}

function App() {
  return (
    <RecoilRoot>
      <Router>
        <MainApp />
      </Router>
    </RecoilRoot>
  );
}

function MainApp() {
  const auth = useRecoilValue(authState);
  const setAuthState = useSetRecoilState(authState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/todo/user/status`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setAuthState({
            isLoggedIn: true,
            userName: response.data.username,
          });
        } else {
          setAuthState({ isLoggedIn: false, userName: null });
        }
      } catch (error) {
        setAuthState({ isLoggedIn: false, userName: null });
      } finally {
        setIsLoading(false);
      }
    }
    checkLoginStatus();
  }, [setAuthState]);

  if (isLoading) {
    
    return <div className='flex flex-col justify-center items-center w-screen h-screen'><CircularProgress size={40} /></div>;
    // <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <>
      {auth.isLoggedIn && <Navbar />}

      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} isLoggedIn={auth.isLoggedIn} />} />
        <Route path="/Completed" element={<ProtectedRoute element={<Completed />} isLoggedIn={auth.isLoggedIn} />} />

        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
