import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import Services from './Services'
import Work from './Work'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Navbar from './Navbar'
import About from './About'
import Footer from './Footer'
import Contactus from './Contactus'
import LoanForm from '../src/LoanForm'
// import  signup  from './Pages/Signup'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { IsLogin } from './Route/Islogin'
import { AuthGuard } from './Route/AuthGuard'
import OtpVerification from './Pages/OtpVerification'
import Product from './Pages/Product'
import ProductDetail from './components/LoanForm/ProductDetail'
// import ProductCard from './components/LoanForm/ProductCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Routes>
 
  <Route element={<AuthGuard />}>
    <Route path="/" element={<><Navbar/>,<Home />,<Services/>,<Work/>,<About/>,<Footer/></>} />
    <Route path="/services" element={<><Navbar/>,<Services />,<Footer/></>} />
    <Route path="/work" element={<><Navbar/>,<Work />,<Footer/></>} />
    <Route path='/about' element={<><Navbar/>,<About/>,<Footer/></>}></Route>  
    <Route path='/loanform' element={<><Navbar/>,<LoanForm />,<Footer/></>}></Route>  
    <Route path='/product' element={<><Navbar />,<Product/>,<Footer /></>} />
    <Route path='/product/:id' element={<><Navbar/>,<ProductDetail/>,<Footer/></>}></Route>
    <Route path='/contactus' element={<><Navbar/>,<Contactus/>,<Footer/></>}></Route>  
  </Route>



  <Route element={<IsLogin />}>

    <Route path='/signup' element={<><Signup /></>}></Route>
    <Route path='/login' element={<><Login/></>}></Route>
    <Route path="/otp" element={<OtpVerification />} />

  </Route>

</Routes>
 
    </>
  )
}

export default App
