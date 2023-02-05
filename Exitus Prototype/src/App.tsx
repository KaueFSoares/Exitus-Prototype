//HOOKS
import { Outlet } from "react-router-dom"

//STYLES
import "./styles/app.sass"

//COMPONENTS
import Navbar from "./components/navbar/Navbar"

function App() {

  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
