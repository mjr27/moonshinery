import React from "react";
import {Divider, Group, Text} from "@mantine/core";

interface PageHeaderProps {
    actions?: React.ReactNode;
    children: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({actions, children}) => {
    const header = <Text size={'xl'} weight={600}>{children}</Text>;
    if (!actions) {
        return header;
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

export default PageHeader;