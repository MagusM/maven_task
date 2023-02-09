import { useState } from "react";
import { useBlink } from "./useBlink";
import useGameInterval from "./useGameInterval";
import usePosition from "./usePosition";
import useStatus from "./useStatus";

const useGame = () => {
    /**
     * game should handle
     * interval
     * game start/stop/reset
     * 
     */

    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const {position, randomAndSetPosition, resetPosition} = usePosition();
    const {
        intervalTS,
        setIntervalTimeStart,
        setIntervalTimeEnd,
        resetIntervalTSObject,
        triggerInterval,
        startInterval,
        stopInterval,
        willShow
    } = useGameInterval();
    const {blink, startBlink, stopBlink} = useBlink();
    const {status, updateStatus, resetStatus} = useStatus();
    
    console.log(`useGame postion is ${position}`);

    function startGame() {
        setGameStarted(true);
        startInterval();
        randomAndSetPosition();
        startBlink(); //needed ?
    }
    
    function stopGame() {
        setGameStarted(false);
        stopInterval();
        stopBlink(); //needed ?
    }

    function resetGame() {
        resetPosition();
        resetIntervalTSObject();
    }

    function incrementScore() {
        setScore((prev) => (prev+1));
    }

    function resetScore() {
        setScore(0);
    }

    return {
        gameStarted: gameStarted,
        startGame,
        stopGame,
        resetGame,
        score: score,
        incrementScore,
        resetScore,
        status: status, 
        updateStatus, 
        resetStatus,
        position: position, 
        randomAndSetPosition, 
        resetPosition,
        willShow: willShow
    }
}

export default useGame;