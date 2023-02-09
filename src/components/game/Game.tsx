import { useCallback, useEffect, useState } from "react";
import { useBlink } from "~/hooks/useBlink";
import useGame from "~/hooks/useGame";
import usePosition from "~/hooks/usePosition";
import { Game as GameI, Player } from '~/models/game';
import { LEFT, MISTAKE, RIGHT, SUCCESS, WRONG_KEY } from "../utils";
import Indicator from "./Indicator";
import StatusElement from "./StatusElement";

type GameProps = {
    gameToRun: boolean
    player: Player
};

const Game = ({ gameToRun, player}: GameProps) => {
    const [keyPressed, setKeyPressed] = useState<string|null>(null);

    // let gameObject: GameI = {
    //     player: player.email,
    //     score: 0,
    // }
    const {
        gameStarted,
        startGame,
        stopGame,
        resetGame,
        score,
        incrementScore,
        resetScore,
        status,
        updateStatus,
        resetStatus,
        position,
        randomAndSetPosition,
        resetPosition
    } = useGame();

    useEffect(() => {
        if (gameToRun) {
            startGame();
        } else {
            stopGame();
        }
    }, [gameToRun]);

    //todo: take in calc the side the indicator is in
    useEffect(() => {
        
        if (keyPressed === '') {
        }
        if (keyPressed === 'a') {
            console.log('a clicked')!
            incrementScore();
            updateStatus({
                stateType: SUCCESS,
                message: SUCCESS
            });
        }
        else if (keyPressed === 'l') {
            console.log('l clicked');
            incrementScore();
            updateStatus({
                stateType: SUCCESS,
                message: SUCCESS
            });
        } else {
            console.log(`${keyPressed} clciked, wrong key`);
            setKeyPressed('');
            updateStatus({
                stateType: MISTAKE,
                message: WRONG_KEY
            });
        }
    }, [gameToRun])

    // function handleKeyPressed(e: KeyboardEvent) {
    //     if (e.key.toLowerCase() === 'a') {
    //         setKeyPressed('a');
    //     }
    //     else if (e.key.toLowerCase() === 'l') {
    //         setKeyPressed('l');
    //     }
    // }

    const handleKeyPressed = useCallback(
        (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'a') {
                setKeyPressed('a');
            }
            else if (e.key.toLowerCase() === 'l') {
                setKeyPressed('l');
            }
        },
      [],
    );
    
    //this should define the status component
    useEffect(() => {
        if (gameToRun) {
            document.addEventListener('keydown', handleKeyPressed);
        } else {
            document.removeEventListener('keydown', handleKeyPressed);
        }
        
        return () => {
            document.removeEventListener('keydown', handleKeyPressed);
        };
    }, [gameToRun]);

    console.log(`side is ${position}`);

    return (
        <div className="flex flex-col w-[99vh] h-[99vh] justify-center">
            <div id="upperContainer" className="flex flex-row h-2/3">
                <div className="flex w-full p-4">
                    <div id={LEFT} className="h-full flex-grow card bg-base-300 rounded-box justify-center items-center place-items-center">
                        {(position === LEFT && gameStarted) ? <Indicator /> : null}
                    </div>
                    <div className="divider divider-horizontal bg-white bg-transparent"></div>
                    <div id={RIGHT} className="h-full flex-grow card bg-base-300 rounded-box place-items-center justify-center items-center">
                        {(position === RIGHT && gameStarted) ? <Indicator /> : null}
                    </div>
                </div>

            </div>
            <div className="divider"></div>
            <div id="lowerContainer" className="text-black h-1/3 flex flex-col justify-center items-center">
                <div className="w-80">
                    {(!gameStarted && status.stateType === '') && <StatusElement {...status} />}
                </div>
                <div>
                    score: {score}
                </div>
            </div>
        </div>
    );
}

export {Game as default};