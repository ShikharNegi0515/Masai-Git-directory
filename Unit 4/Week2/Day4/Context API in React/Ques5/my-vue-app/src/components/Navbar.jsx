import React, { useContext } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
    const { isLoggedIn, toggleAuth } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Flex
            justify="space-between"
            p="4"
            bg={theme === "light" ? "gray.100" : "gray.700"}
            color={theme === "light" ? "black" : "white"}
        >
            <Text fontWeight="bold">
                Status: {isLoggedIn ? "Logged In" : "Logged Out"}
            </Text>
            <Flex gap="2">
                <Button onClick={toggleAuth}>
                    {isLoggedIn ? "Logout" : "Login"}
                </Button>
                <Button onClick={toggleTheme}>
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                </Button>
            </Flex>
        </Flex>
    );
};

export default Navbar;
