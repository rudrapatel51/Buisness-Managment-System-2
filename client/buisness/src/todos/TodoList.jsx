import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    // Retrieve business name from localStorage
    const businessName = localStorage.getItem('businessName');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });

            
            const filteredTodos = response.data.filter(todo => todo.business === businessName);
            setTodos(filteredTodos);
        } catch (error) {
            console.error('Error fetching todos:', error);
            if (error.response && error.response.status === 422) {
                navigate('/login/admin');
            }
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/todos',
                { title, description, business: businessName }, // Include business name
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
                }
            );
            setTitle('');
            setDescription('');
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login/admin');
    };

    return (
        <div>
            <h2>Todo List for {businessName}</h2> {/* Display business name */}
            <button onClick={handleLogout}>Logout</button>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    placeholder="Todo Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Todo Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
