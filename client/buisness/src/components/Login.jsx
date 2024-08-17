import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Heading,
  Container,
  useToast,
  Text,
} from '@chakra-ui/react'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [business, setBusiness] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const lowerCaseBusiness = business.toLowerCase();

        try {
            // Send username, password, and business for login
            const response = await axios.post('http://localhost:5000/login', { username, password, business: lowerCaseBusiness 
            });
            setMessage('Login successful!');
            
            // Save token and business name
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('business', lowerCaseBusiness);
            
            toast({
                title: "Login successful",
                description: "You have been logged in successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Redirect to todos page
            navigate('/user/todos');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred during login');
            }
            toast({
                title: "Login failed",
                description: error.response?.data?.message || 'An error occurred during login',
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            minHeight="100vh"
            width="100%"
            bgGradient="linear(to-r, teal.500, blue.500)"
            py={24}
        >
            <Container maxW="md">
                <Box
                    bg="white"
                    p={8}
                    borderRadius="lg"
                    boxShadow="xl"
                >
                    <VStack spacing={6}>
                        <Heading as="h1" size="xl" textAlign="center">
                            Employee Login
                        </Heading>
                        <form onSubmit={handleLogin} style={{width: '100%'}}>
                            <VStack spacing={4} align="flex-start" width="100%">
                                <FormControl isRequired>
                                    <FormLabel>Username:</FormLabel>
                                    <Input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Password:</FormLabel>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Business Name:</FormLabel>
                                    <Input
                                        type="text"
                                        value={business}
                                        onChange={(e) => setBusiness(e.target.value)}
                                    />
                                </FormControl>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    type="submit"
                                    width="100%"
                                    isLoading={isLoading}
                                >
                                    Login
                                </Button>
                            </VStack>
                        </form>
                        <FormLabel><Link to="/">If New user then Login</Link></FormLabel>
                        {message && <Text color={message.includes('successful') ? 'green.500' : 'red.500'}>{message}</Text>}
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;