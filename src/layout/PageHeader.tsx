import React from "react";
import {Box, Divider, Group, LoadingOverlay, Paper, Text} from "@mantine/core";

interface PageHeaderProps {
    actions?: React.ReactNode;
    children: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({actions, children}) => {
    const header = <Text size={'xl'} weight={600}>{children}</Text>;
    if (!actions) {
        return <Box mb={'sm'}>
            {header}
        </Box>;
    }
    return <>
        <Group position={'apart'}>
            {header}
            <Group>
                {actions}
            </Group>
        </Group>
        <Divider my={'sm'}/>
    </>
}

interface PageTemplateProps {
    actions?: React.ReactNode;
    title: string;
    children: React.ReactNode | React.ReactNode[];
    loading?: boolean;
    withPaper?: boolean
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
                                                              actions,
                                                              title,
                                                              children,
                                                              loading,
                                                              withPaper
                                                          }) => {
    return <>
        <LoadingOverlay visible={!!loading}/>
        <PageHeader actions={actions}>{title}</PageHeader>
        {withPaper ?
            <Paper p={'xs'}>
                {children}
            </Paper> : children}
    </>

}

export default PageHeader;