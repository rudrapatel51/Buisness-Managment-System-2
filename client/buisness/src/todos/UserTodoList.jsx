import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react';

const UserTodoList = () => {
  const [todos, setTodos] = useState([]);
  const toast = useToast();

  // Function to fetch todos (you might already have this)
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
    <Box>
      <VStack spacing={4}>
        {todos.map(todo => (
          <Box key={todo.id} borderWidth="1px" borderRadius="lg" p={4} width="100%">
            <Text fontWeight="bold">{todo.title}</Text>
            <Text>{todo.description}</Text>
            <Button
              colorScheme="red"
              mt={2}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default UserTodoList;
