import { useEffect, useState } from "react";
import { BLINK_DELAY, BLINK_DURATION, randomBetweenZeroAnd } from "~/components/utils";

type BlinkProps = {
    delay: number;
    duration: number;
    gameStarted?: boolean;
};

type ShowIntervalTS = {
    startTime: number,
    endTime: number
};

//todo: change to use Map
const sideMap = {
    0: 'left',
    1: 'right'
};

const initialShowIntervalTSObject: ShowIntervalTS = {
    startTime: 0,
    endTime: 0
}

const useBlink = (delay: number = BLINK_DELAY, duration: number = BLINK_DURATION, gameStarted: boolean = false) => {
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState<keyof typeof sideMap | null>(null);
    const [showIntervalTS, setShowIntervalTS] = useState<ShowIntervalTS>(initialShowIntervalTSObject);

    useEffect(() => {
        if (!gameStarted) {
            return;
        }

        const intervalID = setInterval(() => {
            setPos(sideMap[randomBetweenZeroAnd(1)]);
            startBlink();
            setShowIntervalTimeStart(Date.now());

            setTimeout(() => {
                stopBlink();
                setShowIntervalTimeEnd(Date.now());
            }, duration);
        }, delay);

        return () => {
            clearInterval(intervalID);
            resetIntervalTSObject();
        };

    }, [gameStarted]);

    function setShowIntervalTimeStart(startTime: number) {
        setShowIntervalTS((prev: ShowIntervalTS) => ({...prev, startTime}) )
    }

    function setShowIntervalTimeEnd(endTime: number) {
        setShowIntervalTS((prev: ShowIntervalTS) => ({ ...prev, endTime }))
    }

    function resetIntervalTSObject() {
        setShowIntervalTS(initialShowIntervalTSObject);
    }

    function startBlink() {
        setShow(true);
    }

    function stopBlink() {
        setShow(false);
    }

    function resetBlink() {
        resetIntervalTSObject();
        stopBlink();
    }

    return {
        side: pos,
        show: show,
        showIntervalTS,
        startBlink,
        stopBlink,
        resetBlink
    }

}

export {useBlink}