import { useCallback, useEffect, useState } from "react";
import { useBlink } from "~/hooks/useBlink";
import useGame from "~/hooks/useGame";
import usePosition from "~/hooks/usePosition";
import { Game as GameI, Player } from '~/models/game';
import { LEFT, MISTAKE, RIGHT, SUCCESS, TOO_SOON, WRONG_KEY } from "../utils";
import Indicator from "./Indicator";
import StatusElement from "./StatusElement";

type GameProps = {
    gameToRun: boolean
    player: Player
};

const Game = ({ gameToRun, player }: GameProps) => {
    const [keyPressed, setKeyPressed] = useState<string | null>(null);

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
        resetPosition,
        willShow,
        compareTimeFromEvent
    } = useGame();

    useEffect(() => {
        if (gameToRun) {
            startGame();
        } else {
            stopGame();
        }
    }, [gameToRun]);

    const handleKeyPressed = useCallback(
        (e: KeyboardEvent) => {
            //todo: handle too late scenario
            //too soon
            if (!willShow) {
                console.log('too soon');
                updateStatus({
                    stateType: MISTAKE,
                    message: TOO_SOON,
                });
                resetGame();
                //todo: update server with score
                return;
            }
            const keyP = e.key.toLowerCase()
            console.log(keyP);
            if ((keyP === 'a' && position === LEFT) || (keyP === 'l' && position === RIGHT)) {
                setKeyPressed(keyP);
                incrementScore();
                updateStatus({
                    stateType: SUCCESS,
                    message: SUCCESS,
                });
            } else {
                updateStatus({
                    stateType: MISTAKE,
                    message: WRONG_KEY,
                });
                resetGame();
                //todo: update server with score
            }
        },
        [willShow]
    );

    //this should define the status component
    useEffect(() => {
        if (gameStarted) {
            document.addEventListener('keydown', handleKeyPressed);
        } else {
            document.removeEventListener('keydown', handleKeyPressed);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPressed);
        };
    }, [gameStarted]);

    return (
        <div className="flex flex-col w-[99vh] h-[99vh] justify-center">
            <div id="upperContainer" className="flex flex-row h-2/3">
                <div className="flex w-full p-4">
                    <div id={LEFT} className="h-full flex-grow card bg-base-300 rounded-box justify-center items-center place-items-center">
                        {(willShow && position === LEFT) ? <Indicator /> : null}
                    </div>
                    <div className="divider divider-horizontal bg-white bg-transparent"></div>
                    <div id={RIGHT} className="h-full flex-grow card bg-base-300 rounded-box place-items-center justify-center items-center">
                        {(willShow && position === RIGHT) ? <Indicator /> : null}
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

export { Game as default };