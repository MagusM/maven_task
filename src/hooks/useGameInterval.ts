import { useEffect, useState } from "react";
import { BLINK_DELAY, BLINK_DURATION } from "~/components/utils";
import usePosition from "./usePosition";

type ShowIntervalTS = {
    startTime: number,
    endTime: number
};

const initialShowIntervalTSObject: ShowIntervalTS = {
    startTime: 0,
    endTime: 0
}

const useGameInterval = (delay: number = BLINK_DELAY, duration: number = BLINK_DURATION) => {
    const [intervalTS, setIntervalTS] = useState<ShowIntervalTS>(initialShowIntervalTSObject);
    const [triggerInterval, setTriggerInterval] = useState<boolean>(false);
    const [willShow, setWillShow] = useState<boolean>(false);

    //after each interval randon a new positon
    const {randomAndSetPosition} = usePosition();

    useEffect(() => {
        const intervalID = setInterval(() => {
            setIntervalTimeStart(Date.now());
            randomAndSetPosition();
            setWillShow(true);

            setTimeout(() => {
                setIntervalTimeEnd(Date.now());
                setWillShow(false);
            }, duration);
        }, delay);

        return () => {
            clearInterval(intervalID);
            resetIntervalTSObject();
            setWillShow(false);
        };

    }, [triggerInterval]);

    function setIntervalTimeStart(startTime: number) {
        setIntervalTS((prev: ShowIntervalTS) => ({ ...prev, startTime }))
    }

    function setIntervalTimeEnd(endTime: number) {
        setIntervalTS((prev: ShowIntervalTS) => ({ ...prev, endTime }))
    }

    function resetIntervalTSObject() {
        setIntervalTS(initialShowIntervalTSObject);
    }

    function startInterval() {
        setTriggerInterval(true);
    }

    function stopInterval() {
        setTriggerInterval(false);
    }

    return {
        intervalTS,
        setIntervalTimeStart,
        setIntervalTimeEnd,
        resetIntervalTSObject,
        triggerInterval,
        startInterval,
        stopInterval,
        willShow
    }
}

export default useGameInterval;