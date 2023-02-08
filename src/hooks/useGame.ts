import { useCallback, useState } from "react"
import { BLINK_DELAY, BLINK_DURATION, MISTAKE, SUCCESS, WRONG_KEY } from "~/components/utils";
import { Game as GameI, Status as StatusI } from "~/models/game";
import { useBlink } from "./useBlink";

const gameObjectInitial: GameI = {
    player: '',
    score: 0,
}

const statusObjectInitial: StatusI = {
    stateType: '',
    message: ''
}

const useGame = () => {
    const [gameObj, setGameObj] = useState<GameI>(gameObjectInitial);
    const [status, setStatus] = useState<StatusI>(statusObjectInitial);
    const [startGame, setStartGame] = useState<boolean>(false);
    const { side, show, showIntervalTS,startBlink, stopBlink, resetBlink } = useBlink(BLINK_DELAY, BLINK_DURATION, startGame);

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
        setStartGame(true);
    }
    function stop() {
        setStartGame(false);
    }
    function reset() {
        setGameObj(gameObjectInitial);
        resetBlink();
    }
    function resetStatus() {
        setStatus(statusObjectInitial);
    }

    return {
        setScore,
        handleKeyPressed,
        start,
        stop,
        reset,
        resetStatus,
        show: show,
        side: side,
        status: status,
        score: gameObj.score
    }
}

export {useGame}