import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home.jsx"
import ShowTable from "./pages/ShowTable.jsx"
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/table" element={<ShowTable/>}/>
    </Routes>
  )
}

export default App
