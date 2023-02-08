import { useEffect, useState } from "react";
import { randomBetweenZeroAnd } from "~/components/utils";

type BlinkProps= {
    delay: number;
    duration: number;
};

//todo: change to use Map
const map = {
    0: 'left',
    1: 'right'
};

const useBlink = (delay: number, duration: number): BlinkProps => {
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState<keyof typeof map | null>(null);

    let tsStart = null;
    let tsEnd = null;

    useEffect(() => {
        if (!(delay && duration)) {
            return;
        }

        const intervalID = setInterval(() => {
            setShow(true);
            setPos(map[randomBetweenZeroAnd(1)]);
            tsStart = Date.now();

            setTimeout(() => {
                setShow(false);
                tsEnd = Date.now();
            }, duration);
        }, delay);

        return () => {
            clearInterval(intervalID);
            tsStart = null;
            tsEnd = null;
        };

    }, [delay, duration]);

    function resetTime() {
        tsStart = null;
        tsEnd = null;
    }

    function startBlink() {
        setShow(true);
    }

    function stopBlink() {
        resetTime();
        setShow(false);
    }

    return {
        side: pos,
        show: show,
        resetTime,
        startBlink,
        stopBlink
    }

}

export {useBlink}