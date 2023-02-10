//HOOKS
import { Outlet } from "react-router-dom"
import MyContext from "./context/global info/MyContext"
import { useState } from "react"

//STYLES
import "./styles/app.sass"

//COMPONENTS
import Navbar from "./components/layout/navbar/Navbar"
import Footer from "./components/layout/footer/Footer"

function App() {

  const [code, setCode] = useState<string>()

  return (
    <div className="App">
      <Navbar />
      <MyContext.Provider value={{code, setCode}}>
        <Outlet />
      </MyContext.Provider>
      <Footer />
    </div>
  )
}

export default App
