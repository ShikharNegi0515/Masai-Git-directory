import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { ThemeContext } from "../contexts/ThemeContext";

const Footer = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <Box
            as="footer"
            p="4"
            bg={theme === "light" ? "gray.300" : "gray.900"}
            color={theme === "light" ? "black" : "white"}
            textAlign="center"
            mt="auto"
        >
            © 2025 Dashboard Footer
        </Box>
    );
};

export default Footer;
