import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import Profile from './Pages/Profile';
import Signin from './Pages/Signin';
import SignUp from './Pages/SignUp';
import Offers from './Pages/Offers';
import ForgotPassword from './Pages/ForgotPassword';
import Header from './components/Header';
  import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div >
      <Router>
        <Header/>
        <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/profile'element={<Profile/>}/>
          <Route path='/sign-in'element={<Signin/>}/>
          <Route path='/sign-up'element={<SignUp/>}/>
          <Route path='/forgot-password'element={<ForgotPassword/>}/>
          <Route path='/offers'element={<Offers/>}/>
        </Routes>
      </Router>
      <ToastContainer
    autoClose={5000}
    hideProgressBar={false}
    position="bottom-center"
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
/>
    </div>
  );
}

export default App;
