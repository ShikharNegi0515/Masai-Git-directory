import {
  ChakraProvider,
  Box,
  Flex,
  Grid,
  Button,
  extendTheme
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContextProvider, AuthContext } from './AuthContext';
import { ThemeContextProvider, ThemeContext } from './ThemeContext';

// Main App UI content
function AppContent() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const cardBg = theme === 'light' ? 'gray.200' : 'gray.600';
  const navBg = theme === 'light' ? 'gray.100' : 'gray.700';
  const footerBg = theme === 'light' ? 'gray.300' : 'gray.800';
  const textColor = theme === 'light' ? 'black' : 'white';

  return (
    <Box minH="100vh" bg={theme === 'light' ? 'white' : 'gray.900'} color={textColor}>
      <Flex as="nav" p="4" bg={navBg} justifyContent="space-between">
        <Button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </Flex>

      <Grid
        templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap="4"
        p="4"
      >
        {['Card 1', 'Card 2', 'Card 3'].map((card) => (
          <Box key={card} p="6" shadow="md" bg={cardBg} borderRadius="md">
            {card}
          </Box>
        ))}
      </Grid>

      <Box as="footer" p="4" bg={footerBg} textAlign="center">
        {isLoggedIn ? 'Welcome, User' : 'Please log in'}
      </Box>
    </Box>
  );
}

// Wrapping the App in providers
export default function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <AppContent />
        </ThemeContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
