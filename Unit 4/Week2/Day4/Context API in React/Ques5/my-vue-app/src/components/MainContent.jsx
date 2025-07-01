import React, { useContext } from "react";
import { Grid, Box } from "@chakra-ui/react";
import { ThemeContext } from "../contexts/ThemeContext";

const MainContent = () => {
    const { theme } = useContext(ThemeContext);

    const bgCard = theme === "light" ? "gray.100" : "gray.600";
    const textColor = theme === "light" ? "black" : "white";

    return (
        <Grid
            templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
            gap="4"
            p="4"
            flex="1"
        >
            {["Product 1", "Product 2", "Product 3", "Product 4"].map((item) => (
                <Box
                    key={item}
                    p="6"
                    bg={bgCard}
                    color={textColor}
                    borderRadius="md"
                    shadow="md"
                >
                    {item}
                </Box>
            ))}
        </Grid>
    );
};

export default MainContent;
