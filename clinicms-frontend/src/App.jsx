import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PatientListComponent from './components/PatientListComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import PatientComponent from './components/PatientComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <HeaderComponent />
    
      <main>

      <Routes>
    <Route path='/' element = {<PatientListComponent/>}> </Route>
    <Route path='/patients' element = {<PatientListComponent/>}> </Route>
    <Route path = '/add-patient' element = {<PatientComponent/>}> </Route>
    <Route path = '/edit-patient/:id' element = {<PatientComponent/>}> </Route>
    <Route path = '*' element = {<h1 className='text-center'>404 Not Found</h1>}> </Route>
      </Routes>

      </main>
    <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
