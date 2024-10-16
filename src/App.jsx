import './App.css'
import Navbar from './components/Navbar'
import Landing from './components/Landing';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tracker from './components/Tracker';
// import Footer from './components/Footer';
function App() {

  return (
    <>
      <Router>
          <Navbar />
        <Routes>
          <Route path="Tracker" element={<Tracker />}/>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
