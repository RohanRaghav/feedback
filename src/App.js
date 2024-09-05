import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feedback from './Component/Feedback';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
function App() {
 
  return (
    <>
    <Navbar />
      <Router>
        <Routes>
          <Route path="/feedback" element={<Feedback />} /> 
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
