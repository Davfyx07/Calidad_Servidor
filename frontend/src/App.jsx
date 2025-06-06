import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeContext } from './context/ThemeContext';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegistroPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Verificar si hay preferencia guardada en localStorage
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Actualizar la clase del body cada vez que cambia el modo
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    // Guardar la preferencia en localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <Routes>
          {/* Rutas de autenticación (sin layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          
          {/* Rutas principales (con layout) */}
          <Route path="/home" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />
          <Route path="/dashboard" element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          } />
          
          {/* Redirección de la ruta raíz a home */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Ruta de 404 - No encontrado */}
          <Route path="*" element={
            <MainLayout>
              <div style={{ 
                height: '50vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <h1>404</h1>
                <p>Página no encontrada</p>
              </div>
            </MainLayout>
          } />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;