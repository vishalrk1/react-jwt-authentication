import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/login-pagr";
import SignUpPage from "./pages/signup-page";
import CreatUserProfilePage from "./pages/create-profile-page";
import ProfilePage from "./pages/profile-page";
import CategoryProductsPage from "./pages/category-products-page";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage}></Route>
        <Route path="/login" Component={LoginPage}></Route>
        <Route path="/signup" Component={SignUpPage}></Route>
        <Route path="/create-profile" Component={CreatUserProfilePage}/>
        <Route path="/profile" Component={ProfilePage} />
        <Route path="/:cat_id/products" Component={CategoryProductsPage}/>
      </Routes>
    </>
  );
}

export default App;
