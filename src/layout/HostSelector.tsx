import {Button, Container, Input, Paper, Title} from "@mantine/core";
import React from "react";
import {useInputState, useLocalStorage} from "@mantine/hooks";
import urlJoin from "url-join";
import {API_HOST_LOCAL_DEFAULT_VALUE, API_HOST_LOCAL_STORAGE_KEY, fetchX} from "../api/_urls";

export function HostSelector({onRetry}: { onRetry: () => void }) {
    const [storage, setStorage] = useLocalStorage({
        key: API_HOST_LOCAL_STORAGE_KEY,
        defaultValue: API_HOST_LOCAL_DEFAULT_VALUE,
        serialize(value: string): string {
            return value;
        }
    });

    const [value, setValue] = useInputState<string>(storage);

    async function handleTest() {
        try {
            const response = await fetchX(urlJoin(value, "/info"))
            console.log("RESPONSE IS", response);
            console.log(`SETTING '${value}'`)
            setStorage(value);
            onRetry();
        } catch (e) {
            console.error("ERR IS`", e?.toString(), "`");
            return;
        }
    }

    return <Container p={'xl'}>
        <Title order={2} mb={'xl'}>1st Private Moonshinery</Title>
        <Title order={4} mb={'lg'}>Host selector</Title>
        <Paper shadow="xs" p="md">
            <Input value={value} onChange={setValue}/>
            <Button onClick={handleTest}>Retry</Button>
        </Paper>
    </Container>
}