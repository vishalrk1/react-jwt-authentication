import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { MainContext } from "./utils/contextData";
import HomePage from "./pages/homepage";
import { UserAuthContext, UserDataProvider } from "./providers/authProvider";
import LoginPage from "./pages/login-pagr";
import SignUpPage from "./pages/signup-page";
import CreatUserProfilePage from "./pages/create-profile-page";
import Navbar from "./components/navbar";
import ProfilePage from "./pages/profile-page";

function App() {
  const { user, setUser, setAuthTokens } = useContext(UserAuthContext);
  const navigate = useNavigate();
  console.log(user);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage}></Route>
        <Route path="/login" Component={LoginPage}></Route>
        <Route path="/signup" Component={SignUpPage}></Route>
        <Route path="/create-profile" Component={CreatUserProfilePage}/>
        <Route path="/profile" Component={ProfilePage} />
      </Routes>
    </>
  );
}

export default App;
