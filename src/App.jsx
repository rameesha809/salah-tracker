import './App.css'
import Navbar from './components/Navbar'
import Landing from './components/Landing';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tracker from './components/Tracker';
import Adhkardetails from './components/Adhkar-details';
import AdhkarCards from './components/AdhkarCards';
import Footer from './components/Footer';
import SignIn from './components/Signin';
import AdhkarBookSelector from './components/AdhkarBookSelector';
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="Tracker" element={<Tracker />} />
          <Route path="/Hadith-details" element={<AdhkarBookSelector />} />
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Adhkar-cards" element={<AdhkarCards />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
