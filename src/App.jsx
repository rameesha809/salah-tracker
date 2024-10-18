import './App.css'
import Navbar from './components/Navbar'
import Landing from './components/Landing';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tracker from './components/Tracker';
import Adhkardetails from './components/Adhkar-details';
import Footer from './components/Footer';
import SignIn from './components/Signin';
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="Tracker" element={<Tracker />} />
          <Route path="Adhkar-details" element={<Adhkardetails />} />
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
