'use client'
import {Unity, useUnityContext} from "react-unity-webgl";
import {useCallback, useEffect, useState} from "react";
import {ReactUnityEventParameter} from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import io from 'socket.io-client'




export default function GameComponent({params}: { params: any }) {
    const {unityProvider, sendMessage, addEventListener, isLoaded} = useUnityContext({
        loaderUrl: "build/loader.js",
        dataUrl: "build/webgl.data",
        frameworkUrl: "build/build.framework.js",
        codeUrl: "build/build.wasm",
    });

    const [socket, setSocket] = useState<any>(null)

    const handleQRGenerator = useCallback((gameId: ReactUnityEventParameter): ReactUnityEventParameter => {
        if (!isLoaded) {
            return;
        }
        fetch(`/api/server/setup?id=${gameId}`, {
            method: 'GET',
            headers: {},
        }).then(async (response) => {
            const result = await getBody(response.body)
            console.log(result)
            return sendMessage('QRDataPresenterUI', 'ReceiveQRData', result.split(',')[1])
        });
        return "";
    }, [unityProvider, sendMessage, addEventListener,isLoaded])

    const handleInit = useCallback( (id: ReactUnityEventParameter): ReactUnityEventParameter => {
        if (!isLoaded) {
            return;
        }
        console.log(id)
        fetch(`/api/socket/client?id=${id}&server=true`).then(async(response) => {
            if(!!socket){
                return
            }

            const localSocket = io()
            setSocket(localSocket)
            localSocket.onAny((topic: string, ...args:string[]) => {
                console.log(topic)
                console.log(args)
                if (args.length === 1){
                    const data = JSON.parse(args[0])
                    const ifData = {...data,topic}
                    sendMessage('WebGLWebsocketAdapter', 'ReceiveWebsocketMessage', JSON.stringify(ifData))
                }
            })
            localSocket.emit('startServer', JSON.stringify({id}))

        });


    },[unityProvider, sendMessage, addEventListener,socket,isLoaded])

    const handleSend = useCallback((unitySendMessage: ReactUnityEventParameter): ReactUnityEventParameter => {
        if (!isLoaded || !unitySendMessage) {
            return;
        }
        console.log(unitySendMessage)

        const msgTpc = `${unitySendMessage}`.split('-:-')

        socket?.emit(msgTpc[0], msgTpc[1])
        return ""

    },[unityProvider, sendMessage, addEventListener,socket,isLoaded])

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        addEventListener("GetGameQrCode", handleQRGenerator)
        addEventListener("WebSocketInit",handleInit)
    }, [addEventListener, handleQRGenerator,isLoaded,socket])

    useEffect(() => {
        if (socket && isLoaded) {
            addEventListener("WebSocketSend", handleSend)
        }
    }, [socket, addEventListener]);


    return <div><Unity unityProvider={unityProvider} id={"abcunit123"} style={{width: 800, height: 600}}/>
    </div>;
}

function getBody(body: ReadableStream<Uint8Array> | null): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = body?.getReader();
        if (!reader) {
            resolve('')
        }
        let decoder = new TextDecoder();
        let result = '';

        function read() {
            reader?.read().then(({done, value}) => {
                if (done) {
                    resolve(result);
                    return;
                }
                result += decoder.decode(value || new Uint8Array(), {stream: true});
                read();
            });
        }

        read();
    });
}