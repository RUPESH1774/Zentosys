import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoginPage from "./Componets/Login";
import Dashboard from "./Componets/Dashboard";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to='/dashboard' /> : <LoginPage />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/' />} />
       
      </Routes>
    </Router>
  );
}

export default App;
