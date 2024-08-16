import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserTodoList = () => {
  const [todo,setTodo] = useState([]);
  const navigate = useNavigate()

  const businessName = localStorage.getItem('business');

  useEffect(() => {
    fetchTodos()
  },[])
  const fetchTodos = async () => {
    try {
        const response = await axios.get('http://localhost:5000/todos', {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });

        
        const filteredTodos = response.data.filter(todo => todo.business === businessName);
        setTodo(filteredTodos);
        console.log(filteredTodos)
    } catch (error) {
        console.error('Error fetching todos:', error);
        if (error.response && error.response.status === 422) {
            navigate('/login');
        }
    }
};
  return (
    <div>{
    todo.map((list) => (
      <li key={list.id}>
        <h2>{list.title}</h2>
        <p>{list.description}</p>
      </li>
    ))
    }</div>
  )
}

export default UserTodoList