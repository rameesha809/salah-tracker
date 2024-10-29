import './App.css'
import Navbar from './components/Navbar'
import Landing from './components/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tracker from './components/Tracker/Tracker';
import AdhkarCards from './components/AdhkarCards';
import Footer from './components/Footer';
import AdhkarBookSelector from './components/AdhkarBookSelector';
import Missing from './components/missingPrayer/missing';
import Visualize from './components/visualizing/Visualize';
import 'animate.css';

function App() {

  return (
    <>
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="Tracker" element={<Tracker />} />
          <Route path="/Hadith-details" element={<AdhkarBookSelector />} />
          <Route path="/" element={<Landing />} />
          <Route path="/Adhkar-cards" element={<AdhkarCards />} />
          <Route path="/Visualize" element={<Visualize />} />
          <Route path="/Missing" element={<Missing />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
