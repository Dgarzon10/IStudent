import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forums from './pages/Forums';
import Housing from './pages/Housing';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* NavBar siempre arriba */}
      <NavBar />

      <div className="flex flex-1">
        {/* SideBar fijo en desktop */}
        <SideBar />

        {/* Contenido de página */}
        <div className="flex-1 overflow-y-auto p-8 bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


export default App;
