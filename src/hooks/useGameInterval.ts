import { useEffect, useState } from 'react';
import { BLINK_DELAY, BLINK_DURATION } from '~/components/utils';
import usePosition from './usePosition';

type ShowIntervalTS = {
    startTime: number;
    endTime: number;
};

const initialShowIntervalTSObject: ShowIntervalTS = {
    startTime: 0,
    endTime: 0,
};

const useGameInterval = (delay: number = BLINK_DELAY, duration: number = BLINK_DURATION) => {
    const [intervalTS, setIntervalTS] = useState<ShowIntervalTS>(initialShowIntervalTSObject);
    const [triggerInterval, setTriggerInterval] = useState<boolean>(false);
    const [willShow, setWillShow] = useState<boolean>(false);

    //after each interval randon a new positon
    const { randomAndSetPosition } = usePosition();

    useEffect(() => {
        if (willShow) {
            setIntervalTimeStart(Date.now());
        } else {
            setIntervalTimeEnd(Date.now());
        }
    }, [willShow]);

    useEffect(() => {
        const intervalID = setInterval(() => {
            randomAndSetPosition();
            setWillShow(true);

            setTimeout(() => {
                setWillShow(false);
            }, duration);
        }, delay);

        return () => {
            clearInterval(intervalID);
            resetIntervalTSObject();
            setWillShow(false);
        };
    }, []);

    function setIntervalTimeStart(startTime: number) {
        setIntervalTS((prev: ShowIntervalTS) => ({ ...prev, startTime }));
    }

    function setIntervalTimeEnd(endTime: number) {
        setIntervalTS((prev: ShowIntervalTS) => ({ ...prev, endTime }));
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

    function compareTimeFromEvent(eventTime: number) {
        if (eventTime < intervalTS.startTime) {
            return -1;
        }
        if (eventTime > intervalTS.endTime) {
            return 1;
        }
    }

    return {
        intervalTS,
        setIntervalTimeStart,
        setIntervalTimeEnd,
        resetIntervalTSObject,
        triggerInterval,
        startInterval,
        stopInterval,
        willShow,
        compareTimeFromEvent
    };
};

export default useGameInterval;