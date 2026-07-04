import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Common/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import GameBoard from "./components/Game/GameBoard";
import GameTips from "./components/Common/GameTips";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading)
    return <div className='text-white text-center py-20'>Loading...</div>;
  return isAuthenticated ? children : <Navigate to='/login' />;
};

const Home = () => (
  <GameBoard>
    <GameTips />
  </GameBoard>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='min-h-screen bg-gray-900'>
          <Navbar />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster
            position='top-right'
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "#f3f4f6",
                border: "1px solid #374151",
              },
            }}
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
