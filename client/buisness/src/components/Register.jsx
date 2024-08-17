import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Heading,
  Container,
  useToast,
} from '@chakra-ui/react'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [business, setBusiness] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const lowerCaseBusiness = business.toLowerCase();

        try {
            const response = await axios.post('http://localhost:5000/register', { username, password,business: lowerCaseBusiness 
            });
            toast({
                title: "Registration successful",
                description: response.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');
        } catch (error) {
            toast({
                title: "Registration failed",
                description: error.response?.data?.message || 'An error occurred during registration',
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
                        <Heading as="h1"  size="xl" textAlign="center">
                            Employes's Register 
                        </Heading>
                        <form onSubmit={handleRegister} style={{width: '100%'}}>
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
                                    Register
                                </Button>
                            </VStack>
                        </form>
                        <FormLabel><Link to="/login">If register then Login</Link></FormLabel>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
};

export default Register;