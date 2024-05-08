import './App.css'
import ExampleNavbarTwo from "./components/Navbar"
import ButtonDisplay from "./components/walletConnect"
import SignInThree  from "./pages/buyingComponent"
import TransactionTable from './pages/TransactionComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<><ExampleNavbarTwo/> <ButtonDisplay/> <SignInThree/></>}/>
          <Route path = '/buyToken' element = {<><ExampleNavbarTwo/> <ButtonDisplay/> <SignInThree/></>}/>
          <Route path = '/transactionToken' element = {<><ExampleNavbarTwo/> <ButtonDisplay/> <TransactionTable/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
} 

export default App