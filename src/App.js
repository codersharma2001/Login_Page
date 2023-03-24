import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PhoneSignIn from './components/PhoneSignIn';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <PhoneSignIn />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route index element={<SignIn />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
