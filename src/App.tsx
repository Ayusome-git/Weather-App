import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Weather } from "./pages/Weather"
import { Signup } from "./pages/Signup"
import { Auth } from "./components/Auth"


function App() {

  return<BrowserRouter>
  <Routes>
      <Route path="/" element={<Auth/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/weather" element={<Weather/>}/>
  </Routes>
</BrowserRouter>
}

export default App
