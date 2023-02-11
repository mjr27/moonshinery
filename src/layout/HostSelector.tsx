import {Button, Container, Input, Paper, Title} from "@mantine/core";
import React, {useEffect} from "react";
import {useInputState, useLocalStorage} from "@mantine/hooks";
import urlJoin from "url-join";
import {API_HOST_LOCAL_DEFAULT_VALUE, API_HOST_LOCAL_STORAGE_KEY, fetchX} from "../api/_urls";

export function HostSelector({onRetry}: { onRetry: () => void }) {
    const [storage, setStorage] = useLocalStorage({
        key: API_HOST_LOCAL_STORAGE_KEY,
        defaultValue: API_HOST_LOCAL_DEFAULT_VALUE,
        serialize(value: string): string {
            return value;
        },
        deserialize(value: string) {
            return value;
        }
    });

    const [value, setValue] = useInputState<string>(storage);
    useEffect(() => {
        setValue(storage);
    }, [storage])

    async function handleTest() {
        try {
            await fetchX(urlJoin(value, "/info"));
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
        <Paper shadow="xs" p="md" component={'form'} onSubmit={handleTest}>
            <Input value={value} onChange={setValue}/>
            <Button mt={'md'} type={'submit'}>Retry</Button>
        </Paper>
    </Container>
}