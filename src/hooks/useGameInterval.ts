import { useEffect, useState } from 'react';
import { BLINK_DELAY, BLINK_DURATION } from '~/components/utils';
import usePosition from './usePosition';

type ShowIntervalTS = {
    startTime: number;
    endTime: number;
};

const useGameInterval = (delay: number = BLINK_DELAY, duration: number = BLINK_DURATION) => {
    const [triggerInterval, setTriggerInterval] = useState<boolean>(false);
    const [willShow, setWillShow] = useState<boolean>(false);

    //after each interval randon a new positon
    const { position, randomAndSetPosition, resetPosition } = usePosition();

    useEffect(() => {
        if (!triggerInterval) {
            return;
        }
        console.log('interval triggered');
        const intervalID = setInterval(() => {
            randomAndSetPosition();
            setWillShow(true);

            setTimeout(() => {
                resetPosition();
                setWillShow(false);
            }, duration);
        }, delay);

        return () => {
            clearInterval(intervalID);
            setWillShow(false);
        };
    }, [triggerInterval]);

    function startInterval() {
        setTriggerInterval(true);
    }

    function stopInterval() {
        setTriggerInterval(false);
    }

    return {
        triggerInterval,
        startInterval,
        stopInterval,
        willShow,
        position,
        randomAndSetPosition, 
        resetPosition
    };
};

export default useGameInterval;