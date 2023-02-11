import {Group, Text} from "@mantine/core";

export const Logo = () => <Group spacing={'xs'}>
    <a href={'/'}>
        <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt={'The First Private Moonshinery'}/>
    </a>
    <Text component={'a'} href={'/'} weight={500}>
        The First Private Moonshinery
    </Text>
</Group>