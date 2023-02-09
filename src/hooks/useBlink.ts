import { useState } from "react";

const useBlink = () => {
    const [blink, setBlink] = useState(false);
    

    function startBlink() {
        setBlink(true);
    }

    function stopBlink() {
        setBlink(false);
    }

    return {
        blink,
        startBlink,
        stopBlink
    }
}

export {useBlink}