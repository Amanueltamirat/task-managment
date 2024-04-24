import React from 'react'
import Tasks from './screens/tasks/Tasks'
import {BrowserRouter, Link, NavLink, Route, Routes} from 'react-router-dom'
import Tasklist from './screens/tasklist/Tasklist'
import Updatetask from './screens/tasks/Updatetask'
import SigninForm from './screens/signinform/SigninForm'
import SignupForm from './screens/signinform/SignUpForm'
import TaskDetail from './screens/tasks/TaskDetail'
// import SignupForm from './screens/signinform/SignupForm'
function App() {
  return (
    <div className='app'>
    
      <BrowserRouter>
      <header>
        <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to='/'>Home</NavLink>
         <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to='/yourtasks'>Your tasks</NavLink>
           <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to='/signin'>Sign in</NavLink>
      </header>
      <Routes>
         <Route path='/' element={<Tasks/>}/>
         <Route path='/yourtask/:id' element={<TaskDetail/>}/>
          <Route path='/yourtasks' element={<Tasklist/>}/>
          <Route path='/editetask/:id' element={<Updatetask/>}/>
          <Route path='/signin' element={<SigninForm/>}/>
          <Route path='/signup' element={<SignupForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App