import React, { useContext } from "react";
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    IconButton,
    useDisclosure,
    useBreakpointValue
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

const Sidebar = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isMobile = useBreakpointValue({ base: true, md: false });

    const sidebarContent = (
        <Box
            bg={theme === "light" ? "gray.200" : "gray.800"}
            p="4"
            minH="100vh"
            color={theme === "light" ? "black" : "white"}
            fontWeight="bold"
        >
            {isLoggedIn ? "Welcome, User!" : "Please log in"}
        </Box>
    );

    if (isMobile) {
        return (
            <>
                <IconButton
                    icon={<HamburgerIcon />}
                    onClick={onOpen}
                    m="2"
                    aria-label="Open Sidebar"
                />
                <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerBody>{sidebarContent}</DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }

    return <Box w="250px">{sidebarContent}</Box>;
};

export default Sidebar;
