

import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterRider from './pages/RegisterRider'
import LoginUser from './pages/LoginUser'
import BookRide from './pages/BookRide'
import ProtectedRoutes from './pages/ProtectedRoutes'
function App() {
  

  return (  
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path='' element={<RegisterRider/>} />
        <Route path='/login' element={<LoginUser/>} />
        <Route path= '/bookride' element= {<ProtectedRoutes>
          <BookRide/>
          </ProtectedRoutes>
          } />
      </Routes>
    </BrowserRouter> 
    </>
     
     
  )
}

export default App
