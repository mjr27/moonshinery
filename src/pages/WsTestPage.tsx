import { useEffect } from "react"
import useWebSocket from "react-use-websocket";
import { ReadyState } from "react-use-websocket/dist/lib/constants";

const WS_URL = "wss://10.0.0.227/ws";
export function WsTestPage() {
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        share: true,
        filter: (msg) => {
            console.log("Data is", msg.type, msg.data);
            return true;
        },
        retryOnError: true,
        shouldReconnect: () => true,


    });
    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            setTimeout(() => {
                sendJsonMessage({
                    a: 'b'
                })
            }, 1000)
            setTimeout(() => {
                sendJsonMessage({
                    a: 'b'
                })
            }, 3000)
            setTimeout(() => {
                sendJsonMessage({
                    a: 'b'
                })
            }, 5000)
        }
    }, [readyState, sendJsonMessage]);
    return <b>qqq</b>
}