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
import CreatePage from './Pages/CreatePage';
import PostDetailPage from './Pages/PostDetailPage';
import Post from './Store/PostContext';


function App() {
  const {setUser} = useContext(AuthContext);
  // const {firebase} = useContext(FirebaseContext);
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      // console.log(user);
    });
  })
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route element={<HomePage />} path='/' />
            <Route element={<SignupPage />} path='/signup' />
            <Route element={<LoginPage />} path='/login' />
            <Route element={<CreatePage /> } path='/create' />
            <Route element={<PostDetailPage /> } path='/post-detail' />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
