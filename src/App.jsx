/* eslint-disable react-hooks/static-components */
import './App.css'
import ListEmployeeComponent from './pages/ListEmployeeComponent'
import EmployeeComponent from './pages/EmployeeComponent'
import RegisterComponent from './pages/RegisterComponent'
import LoginComponent from './pages/LoginComponent'
import HeaderComponent from './components/HeaderComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({children}){
    const isAuth = isUserLoggedIn();
    if(isAuth){
      return children;
    }
    return <Navigate to="/" />
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent /> 

        <Routes>
          <Route path='/' element = { <LoginComponent />}></Route> 
          <Route path='/login' element = { <LoginComponent />}></Route>
          <Route path='/register' element = { <RegisterComponent />}></Route>

          <Route path='/employees' element = { 
            <AuthenticatedRoute>
              <ListEmployeeComponent />
            </AuthenticatedRoute>
          }></Route>

          <Route path='/add-employee' element = { 
            <AuthenticatedRoute>
              <EmployeeComponent />
            </AuthenticatedRoute>
          }></Route>

          <Route path='/edit-employee/:id' element = { 
            <AuthenticatedRoute>
              <EmployeeComponent />
            </AuthenticatedRoute>
          }></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App