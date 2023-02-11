import React, {useEffect, useState} from 'react';
import LayoutRoutes from "./layout/LayoutRoutes";
import {apiGetCurrentProgram, IApiProgramDto, ProgramStateContext} from "./api/program";
import {DEFAULT_REFRESH_INTERVAL} from "./api/_urls";
import {HostSelector} from "./layout/HostSelector";

function App() {

    const [context, setContext] = useState<IApiProgramDto | null>({
        program: 'disconnected'
    });
    const [retry, setRetry] = useState(0);

    function handleOnRetry() {
        setRetry(retry + 1)
    }

    useEffect(() => {
        let timeout = 0;
        const worker = async () => {
            const response = await apiGetCurrentProgram();
            if (response.success && response.result) {
                setContext(response.result);
            } else {
                if (!response.success && 'sysError' in response) {
                    setContext(null);
                    return;
                }
            }
            timeout = window.setTimeout(worker, DEFAULT_REFRESH_INTERVAL)
        };
        worker().then();
        return () => clearTimeout(timeout);
    }, [setContext, retry]);

    return (
        <ProgramStateContext.Provider value={context ?? {program: 'disconnected'}}>
            {context === null
                ? <HostSelector onRetry={handleOnRetry}/>
                : <LayoutRoutes/>}
        </ProgramStateContext.Provider>
    );
}

export default App;
