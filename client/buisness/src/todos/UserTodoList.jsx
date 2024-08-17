import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react';

const UserTodoList = () => {
  const [todos, setTodos] = useState([]);
  const toast = useToast();
  const businessName = localStorage.getItem("business")

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete('http://localhost:5000/todos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        data: { id }
      });
      
      // Update the local state to remove the deleted todo
      setTodos(todos.filter(todo => todo.id !== id));
      
      toast({
        title: "Todo deleted",
        description: "The todo item was deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast({
        title: "Error",
        description: "Failed to delete the todo item.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Todo List {businessName}</h1>
                </div>
    <ul className="container p-16 space-y-3 ">
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
};

export default UserTodoList;
