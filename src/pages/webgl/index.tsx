'use client'
import { Unity, useUnityContext } from "react-unity-webgl";
import {useEffect, useState} from "react";
import * as qrcode from 'qrcode';

export default function GameComponent({params}: { params: any }) {
    const [img, setImg] = useState<string>("")

    useEffect(() => {

        const generateQR = async () => {
            const qrCodeDataURL = await qrcode.toDataURL("https://www.google.com");
            setImg(qrCodeDataURL);
            return
        }
        generateQR();
    }, [img]);

    const { unityProvider } = useUnityContext({
        loaderUrl: "build/v0.6.loader.js",
        dataUrl: "build/webgl.data",
        frameworkUrl: "build/build.framework.js",
        codeUrl: "build/build.wasm",
    });

    return <div><Unity unityProvider={unityProvider} id={"abcunit123"} style={{ width: 800, height: 600 }}/>
    <img src={img} alt="qr code" />
    </div>;
}