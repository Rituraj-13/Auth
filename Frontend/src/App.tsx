import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import SecureRoute from './components/SecureRoute'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        {/* <Route path='/protected' element={<ProtectedRoute />} /> */}
        <Route path='/protected' element={<SecureRoute element={ProtectedRoute} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
