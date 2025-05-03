import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forums from './pages/Forums';
import Housing from './pages/Housing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForumDetail from './pages/ForumDetail';
import Institute from './pages/Institute';
import NewPostPage from './pages/NewPost';
import { Toaster } from 'react-hot-toast';
import NewHousing from './pages/NewHousing';
import PostDetail from './components/Post/PostDetail';

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
        <Toaster position="top-center" reverseOrder={false} /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/institute" element={<Institute />} />
            <Route path="/forums/:forumName" element={<ForumDetail />} /> 
            <Route path="/new-post" element={<NewPostPage />} />
            <Route path="/forums/:forumName/:postId" element={<ForumDetail />} />
            <Route path="/housing/new" element={<NewHousing />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            {/* Agregar más rutas según sea necesario */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


export default App;
