import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import './compenents/css/App.css';
import Login from './pages/login/Login';
import Home from './pages/Home/Home';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Signin from './pages/signin/Signin';


function App() {

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />;
  };


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
