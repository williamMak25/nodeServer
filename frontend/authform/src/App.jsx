
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './component/signup'
import { Home } from './component/home'
import { Privateroute } from './component/privateroute'
import { Signin } from './component/SignIn'
import { EditForm } from './component/editForm'

function App() {
  
  
  return (
  <BrowserRouter>
    <Routes>
      <Route element={<Privateroute/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/edit' element={<EditForm/>}/>
      </Route>
      <Route path='/login' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
