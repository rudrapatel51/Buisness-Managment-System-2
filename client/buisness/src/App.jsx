import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import LoginAdmin from "./admin/LoginAdmin";
import RegisterAdmin from "./admin/RegisterAdmin";
import TodoList from "./todos/TodoList";
import UserTodoList from "./todos/UserTodoList";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="login/admin" element={<LoginAdmin />} />
        <Route path="register/admin" element={<RegisterAdmin />} />
        <Route path="todos" element={<TodoList />} />
        <Route path="user/todos" element={<UserTodoList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
