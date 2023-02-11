import React, {useState} from "react";
import {Button, Group} from "@mantine/core";
import {PageTemplate} from "../layout/PageHeader";

export const RefluxStillSettingForm: () => JSX.Element = () => {

    const [loading] = useState(false);

    function handleSave() {
        console.log("HANDLE SAVE");
    }

    function handleReset() {
        console.log("HANDLE RESET");
    }

    return <PageTemplate title='Reflux Still configuration' loading={loading} withPaper>
        <p>TODO: TO BE IMPLEMENTED</p>
        <Group position={'apart'} mt={'md'}>
            <Button onClick={handleSave} variant="light">Save</Button>
            <Button onClick={handleReset} color={'red'} variant="light">Reset</Button>
        </Group>
    </PageTemplate>
}