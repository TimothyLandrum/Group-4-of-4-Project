import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from "./UserComponent/Home"
import Login from './UserComponent/Login'
import Register from "./UserComponent/Register"
import Createevent from './UserComponent/Createevent'
import Profile from './UserComponent/Profile'
import SingleEvent from './UserComponent/SingleEvent'
import PageNotFound from './PageNotFound'
import EventUpdate from './UserComponent/EventUpdate'
import PasswordReset from './UserComponent/PasswordReset'

function Maincontent() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/createevent' element={<Createevent/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/event/:id' element={<SingleEvent/>}></Route>
            <Route path='/event/update' element={<EventUpdate/>}></Route>
            <Route path='/passwordreset' element={<PasswordReset/>}></Route>
            <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
    </div>
  )
}

export default Maincontent