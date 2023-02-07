import { useCallback, useState } from "react"
import { BLINK_DELAY, BLINK_DURATION, MISTAKE, SUCCESS, WRONG_KEY } from "~/components/utils";
import { Game as GameI, Status } from "~/models/game";
import { useBlink } from "./useBlink";

const gameObjectInitial: GameI = {
    player: '',
    score: 0,
}

const useGame = () => {
    const [gameObj, setGameObj] = useState<GameI>(gameObjectInitial);
    const { side, show } = useBlink(BLINK_DELAY, BLINK_DURATION);
    const [status, setStatus] = useState<Status | null>(null);

    function setScore(score: number) {
        setGameObj((prev: GameI) => ({
            ...prev,
            score
        }));
    }

    const incrementScore = useCallback(() => setGameObj((prev: GameI) => ({
        ...prev,
        score: prev.score + 1
        })), []);
    
    function handleKeyPressed(e: KeyboardEvent) {
        if (!show) {
            //todo: handle too soon or too late
            return;
        }
        if (e.key.toLowerCase() === 'a' && side === 'left') {
                incrementScore();
                setStatus({
                    stateType: SUCCESS,
                    message: SUCCESS
                });
        }
        else if (e.key.toLowerCase() === 'l' && side === 'right') {
            incrementScore();
            setStatus({
                stateType: SUCCESS,
                message: SUCCESS
            });
        } else {
            setStatus({
                stateType: MISTAKE,
                message: WRONG_KEY
            });
            stop();
        }
    }
    function start() {

    }
    function stop() {
        /**
         * reset status
         * reset game obj
         * reset useBlink
         */
    }

    return {
        setScore,
        handleKeyPressed,
        start,
        stop,
        show: show,
        side: side,
        status: status,
        score: gameObj.score
    }
}

export {useGame}