import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Offers from "./Pages/Offers";
import ForgotPassword from "./Pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CreateListing from "./Pages/CreateListing";
import EditListing from "./Pages/EditListing";
import { Listing } from "./Pages/Listing";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute />}>
            {/* use of Outlet    */}
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offers />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          {/* creating private route for listing */}
          <Route path="/create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route path="/edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
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
