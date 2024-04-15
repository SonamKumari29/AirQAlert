import './App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Journal from './Components/Journal';
import Explore from './Components/Explore';
import Consult from './Components/Consult';
import Profile from './Components/Profile';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Explore />} />
          <Route path='/services'element={<Journal />} />
          <Route path='/contact' element={<Consult />}/>
          <Route path='/about' element={<Profile />}/>
          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;