import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import "leaflet/dist/leaflet.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
