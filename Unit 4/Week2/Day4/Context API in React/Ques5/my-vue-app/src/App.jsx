import React from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Flex direction="column" minH="100vh">
            <Navbar />
            <Flex flex="1">
              <Sidebar />
              <MainContent />
            </Flex>
            <Footer />
          </Flex>
        </ThemeContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
