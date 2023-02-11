import {useEffect, useState} from "react";
import {apiGetFirmwareInfo, IFirmwareInfo} from "../api/config";
import {PageTemplate} from "../layout/PageHeader";
import {TypographyStylesProvider} from "@mantine/core";

export function AboutPage() {
    const [firmwareInfo, setFirmwareInfo] = useState<IFirmwareInfo | null>(null);
    useEffect(() => {
        apiGetFirmwareInfo()
            .then(info => {
                if (info.success && info.result) {
                    setFirmwareInfo(info.result);
                }
            })
    }, [setFirmwareInfo])

    return <PageTemplate title={"About"}
                         loading={firmwareInfo === null}
                         withPaper>
        {firmwareInfo && <TypographyStylesProvider p={"xl"}>
            <p>{firmwareInfo.name} version<code>{firmwareInfo.ver}</code></p>
            <p>Built
                with <code>ESP-IDF {firmwareInfo.idf_ver}</code> @ <small>{firmwareInfo.date} {firmwareInfo.time}</small>
            </p>
        </TypographyStylesProvider>}
    </PageTemplate>
}