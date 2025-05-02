import { useState } from 'react'
import { Route, Routes } from 'react-router'
import UserList from './components/Userlist'
import AddUser from './components/AddUser'
import NavBar from './components/NavBar'

function App() {
  

  return (
    <Routes>
      <Route path='/' element={<NavBar />}></Route>
      <Route path='user-list' element={<UserList/>}></Route>
      <Route path='add-user' element={<AddUser/>}></Route>
    </Routes>
  )
}

export default App
