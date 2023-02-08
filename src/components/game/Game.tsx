import { useEffect } from "react";
import { useBlink } from "~/hooks/useBlink";
import { useGame } from "~/hooks/useGame";
import { Game as GameI, Player } from '~/models/game';
import { BLINK_DELAY, BLINK_DURATION } from "../utils";
import Indicator from "./Indicator";
import Status from "./Status";

type GameProps = {
    gameStatus: boolean
    player: Player
};

const Game = ({ gameStatus, player}: GameProps) => {
    let gameObject: GameI = {
        player: player.email,
        score: 0,
    }
    const {
        setScore,
        handleKeyPressed,
        start,
        stop,
        side,
        status,
        show,
        score
    } = useGame();

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPressed);
        return () => {
            document.removeEventListener('keydown', handleKeyPressed);
        };
    }, [handleKeyPressed])

    useEffect(() => {
        //todo: start game
        //trigger userBlink -> start, stop, side

    }, [status]);

    return (
        <div className="flex flex-col w-[99vh] h-[99vh] justify-center">
            <div id="upperContainer" className="flex flex-row h-2/3">
                <div className="flex w-full p-4">
                    <div id='left' className="h-full flex-grow card bg-base-300 rounded-box justify-center items-center place-items-center">
                        {(side === 'left' && show) ? <Indicator /> : null}
                    </div>
                    <div className="divider divider-horizontal bg-white bg-transparent"></div>
                    <div id='right' className="h-full flex-grow card bg-base-300 rounded-box place-items-center justify-center items-center">
                        {(side === 'right' && show) ? <Indicator /> : null}
                    </div>
                </div>

            </div>
            <div className="divider"></div>
            <div id="lowerContainer" className="text-black h-1/3 flex flex-col justify-center items-center">
                <div className="w-80">
                    {status.message === '' ? null : <Status status={status} />}    
                </div>
                <div>
                    score: {score}
                </div>
            </div>
        </div>
    );
}

export {Game as default};