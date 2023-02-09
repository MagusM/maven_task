import { useEffect, useState } from "react";
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
    const {
        triggerInterval,
        startInterval,
        stopInterval,
        willShow,
        position,
        randomAndSetPosition,
        resetPosition
    } = useGameInterval();
    const {status, updateStatus, resetStatus} = useStatus();
    
    
    useEffect(() => {
        console.log(`useGame postion is ${position}`);
    }, [position]);

    function startGame() {
        setGameStarted(true);
        startInterval();
    }
    
    function stopGame() {
        setGameStarted(false);
        stopInterval();
    }

    function resetGame() {
        resetPosition();
        resetScore();
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
        willShow: willShow,
    }
}

export default useGame;