import {IconPokerChip} from "@tabler/icons-react";
import {Group, Text} from "@mantine/core";

export const Logo = () => <Group spacing={'xs'}>
    <a href={'/'}> <IconPokerChip/></a>
    <Text component={'a'} href={'/'}>
        ESP32
    </Text>
</Group>