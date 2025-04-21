import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import Forums from './pages/Forums';
import Housing from './pages/Housing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="flex h-screen">
        <SideBar />
        <div className="flex-1 flex flex-col">
          
          <main className="flex-1 overflow-y-auto p-8 bg-background">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/forums" element={<Forums />} />
              <Route path="/housing" element={<Housing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
