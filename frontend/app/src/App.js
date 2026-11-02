import React from 'react'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Profile from './Pages/Profile'
import Header from './components/Header'
import Home from './Pages/Home'
import Chat from './components/Chat/Chat'
import ChatList from './components/Chat/ChatList'


function App() {
  return (
    <>
    <Router>
      <Header/>
      <Container>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/login' Component={Login}/>
          <Route path='/signup' Component={Signup}/>
          <Route path='/profile' Component={Profile}/>
          <Route path='/chats' Component={ChatList}/>
          <Route path='/chat/:chatId' Component={Chat}/>
        </Routes>
      </Container>
    </Router>
    </>
  )
}

export default App