import { useCallback, useEffect, useState } from "react";
import { upsertUser } from "~/api";
import useGame from "~/hooks/useGame";
import { Player } from '~/models/game';
import { LEFT, MISTAKE, RIGHT, SUCCESS, TOO_LATE, TOO_SOON, WRONG_KEY } from "../utils";
import Indicator from "./Indicator";
import StatusElement from "./StatusElement";

type GameProps = {
    gameToRun: boolean
    player: Player
};

const Game = ({ gameToRun, player }: GameProps) => {
    const [keyPressed, setKeyPressed] = useState<string | null>(null);

    const {
        gameStarted,
        startGame,
        stopGame,
        resetGame,
        score,
        incrementScore,
        status,
        updateStatus,
        resetStatus,
        position,
        willShow,
        setWillShow,
        triggerInterval
    } = useGame();

    useEffect(() => {
        if (gameToRun) {
            startGame();
        } else {
            stopGame();
            (async () => {
                const newPlayer = { ...player, score: score };
                const res = await upsertUser(newPlayer);
                console.log(res);
            })();
        }
    }, [gameToRun, player]);

    const handleKeyPressed = useCallback(
        (e: KeyboardEvent) => {
            const keyP = e.key.toLowerCase();
            setKeyPressed(keyP);
            if (!willShow) {
                updateStatus({
                    stateType: MISTAKE,
                    message: TOO_SOON,
                });
                resetGame();
                (async () => {
                    const newPlayer = {...player, score: score};
                    const res = await upsertUser(newPlayer);
                    console.log(res);
                })();
                return;
            }
            if ((keyP === 'a' && position === LEFT) || (keyP === 'l' && position === RIGHT)) {
                incrementScore();
                updateStatus({
                    stateType: SUCCESS,
                    message: SUCCESS,
                });
                setWillShow(false);
            } else {
                updateStatus({
                    stateType: MISTAKE,
                    message: WRONG_KEY,
                });
                setWillShow(false);
                resetGame();
                (async () => {
                    const newPlayer = { ...player, score: score };
                    const res = await upsertUser(newPlayer);
                    console.log(res);
                })();
            }
        },
        [willShow]
    );

    useEffect(() => {
        if (gameStarted) {
            document.addEventListener('keydown', handleKeyPressed);
        } else {
            document.removeEventListener('keydown', handleKeyPressed);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPressed);
        };
    }, [willShow]);

    useEffect(() => {
        if (triggerInterval && !willShow && keyPressed === null) {
            updateStatus({
                stateType: MISTAKE,
                message: TOO_LATE,
            });
            resetGame();
            (async () => {
                const newPlayer = { ...player, score: score };
                const res = await upsertUser(newPlayer);
                console.log(res);
            })();
        }
    }, [willShow]);

    useEffect(() => {
        if (!willShow) {
            setKeyPressed(null);
        }
    }, [willShow]);

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
                    {!willShow && <StatusElement {...status} /> }
                </div>
                <div>
                    score: {score}
                </div>
            </div>
        </div>
    );
}

export { Game as default };