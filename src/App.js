import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
/**
 * ?  =====Import Components=====
 */
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import { AuthContext } from './Store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const {setUser} = useContext(AuthContext);
  // const {firebase} = useContext(FirebaseContext);
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    // console.log(user);
  })
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<SignupPage />} path='/signup' />
          <Route element={<LoginPage />} path='/login' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
