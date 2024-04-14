import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage/LandingPage";
import {Login} from "./Login/Login";
import {Signup} from "./Signup/Signup";
import {LogedPage} from "./LogedPage/LogedPage";


function App () {
    return (
<Router>
<Routes>
  
   <Route exact path="/" element={<LandingPage/>} />
   <Route exact path="/login" element={<Login/>} />
   <Route exact path="/signup" element={<Signup/>} />
    <Route exact path="/logedPage" element={<LogedPage/>} />

</Routes>
</Router>
    );
}

export default App