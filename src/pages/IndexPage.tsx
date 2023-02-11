import {Button, Card, Group, LoadingOverlay, Text, TypographyStylesProvider} from "@mantine/core";
import {IconPlayerPlay} from "@tabler/icons-react";
import {useState} from "react";
import {apiStartPotStillProgram} from "../api/program";
import {PageTemplate} from "../layout/PageHeader";


export function PotStillBlock({onStart}: { onStart: () => void }) {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    async function handleStartPotStill() {
        setButtonDisabled(true);
        try {
            await apiStartPotStillProgram();
        } catch (e) {
            console.log("ERROR", e)
            setButtonDisabled(false);
            return;
        }
        onStart();
        await new Promise(resolve => setTimeout(resolve, 5000));
        setButtonDisabled(false);
    }

    return <PageTemplate title={'Program list'}>
        <Card my={'md'} p={'lg'}>
            <Group position={'apart'}>
                <Text size={'lg'} weight={500}>Start pot still program</Text>
                <Button leftIcon={<IconPlayerPlay/>} onClick={handleStartPotStill}
                        disabled={buttonDisabled}>Start</Button>
            </Group>
            <TypographyStylesProvider mt={'md'}>
                <p>Pot still distillery description</p>
            </TypographyStylesProvider>
        </Card>
    </PageTemplate>
}

export default function IndexPage() {
    const [loading, setLoading] = useState(false);

    function onProgramStart() {
        setLoading(true);
    }

    return <div style={{position: 'relative'}}>
        <LoadingOverlay visible={loading}/>
        <PotStillBlock onStart={onProgramStart}/>
    </div>
}