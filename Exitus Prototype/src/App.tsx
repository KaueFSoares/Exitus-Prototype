//HOOKS
import { Outlet } from "react-router-dom"

//STYLES
import "./styles/app.sass"

//COMPONENTS
import Navbar from "./components/layout/navbar/Navbar"
import Footer from "./components/layout/footer/Footer"

function App() {

  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
