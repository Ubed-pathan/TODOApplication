import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './routes/Home'
import Completed from './routes/Completed';


function App() {
  

  return (
    <>
     <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Completed" element={<Completed />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
