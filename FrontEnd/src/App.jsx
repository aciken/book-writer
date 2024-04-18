import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage/LandingPage";
import {Login} from "./Login/Login";
import {Signup} from "./Signup/Signup";
import {LogedPage} from "./LogedPage/LogedPage";
import {Step1} from "./Steps/step1";
import {Step2} from "./Steps/step2";
import {Step3} from "./Steps/step3";


function App () {
    return (
<Router>
<Routes>
  
   <Route exact path="/" element={<LandingPage/>} />
   <Route exact path="/login" element={<Login/>} />
   <Route exact path="/signup" element={<Signup/>} />
    <Route exact path="/logedPage" element={<LogedPage/>} />
    <Route exact path="/logedPage/step1" element={<Step1/>} />
    <Route exact path="/logedPage/step2" element={<Step2/>} />
    <Route exact path="/logedPage/step3" element={<Step3/>} />
</Routes>
</Router>
    );
}

export default App