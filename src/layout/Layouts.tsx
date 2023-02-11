import React, {useEffect, useState} from "react";
import {
    ActionIcon,
    AppShell,
    Burger,
    Container,
    Group,
    Header,
    MediaQuery,
    Navbar,
    useMantineColorScheme,
    useMantineTheme
} from "@mantine/core";
import {Logo} from "./Logo";
import {IconMoonStars, IconSun} from "@tabler/icons-react";
import SidebarMenu from "./SidebarMenu";
import {useLocation} from "react-router-dom";

export const SinglePageLayout = ({children}: { children?: React.ReactElement }) => {
    const theme = useMantineTheme();
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();

    return <AppShell
        padding={0}
        styles={{
            main: {
                background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
        }}
        header={<Header height={{base: 50, md: 70}} p="xs">
            <Group sx={{height: '100%'}} px={20} position="apart">
                <Logo/>
                <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme === 'dark' ? <IconSun/> : <IconMoonStars/>}
                </ActionIcon>
            </Group>
        </Header>}
    >
        <Container pt={'md'} pb={0} px={0}
                   style={{minHeight: '50vh'}}>
            {children}
        </Container>
    </AppShell>
}

export const MultiPageLayout = ({children}: { children?: React.ReactNode }) => {
    const theme = useMantineTheme();
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const [opened, setOpened] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpened(false)
    }, [location])

    return <AppShell
        padding={0}
        styles={{
            main: {
                background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
        }}
        navbar={
            <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}} style={{zIndex: 500}}>
                <SidebarMenu/>
            </Navbar>
        }
        header={<Header height={{base: 50, md: 70}} p="xs">
            <Group sx={{height: '100%'}} px={20} position="apart">
                <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>
                <Logo/>
                <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme === 'dark' ? <IconSun/> : <IconMoonStars/>}
                </ActionIcon>
            </Group>
        </Header>}
    >
        <Container pt={'md'} pb={0}
                   style={{minHeight: '70vh', position: 'relative'}}>
            {children}
        </Container>
    </AppShell>
}