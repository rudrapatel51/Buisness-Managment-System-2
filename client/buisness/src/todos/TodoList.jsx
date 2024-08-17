import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
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
                { title, description, business: businessName }, 
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
                }
            );
            setTitle('');
            setDescription('');
            fetchTodos();
            alert('Todo added successfully');
        } catch (error) {
            console.error('Error adding todo:', error);
            alert('Error adding todo');
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete('http://localhost:5000/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                data: { id }
            });
            setTodos(todos.filter(todo => todo.id !== id));
            alert('Todo deleted successfully');
        } catch (error) {
            console.error('Error deleting todo:', error);
            alert('Error deleting todo');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login/admin');
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Todo List for {businessName}</h1>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Logout
                </button>
            </div>

            <form onSubmit={handleAddTodo} className="mb-6">
                <div className="flex flex-col space-y-2">
                    <input
                        type="text"
                        placeholder="Todo Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Todo Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Todo
                    </button>
                </div>
            </form>

            <ul className="space-y-3">
                {todos.map((todo) => (
                    <li key={todo.id} className="bg-gray-100 p-4 rounded shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">{todo.title}</h3>
                                <p className="text-sm text-gray-600">{todo.description}</p>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;