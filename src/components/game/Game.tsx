import { useEffect } from "react";
import { Game as GameI, Player } from '~/models/game';

type GameProps = {
    status: boolean
    player: Player
};

const Game = ({status, player}: GameProps) => {
    const blinkDuration = 1000; //1 sec

    let gameObject: GameI = {
        player: player.email,
        score: 0,
    }

    useEffect(() => {
        //todo: start game

    }, [status]);

    return (
        <div className="flex flex-col w-[99vh] h-[99vh] justify-center">
            <div id="upperContainer" className="flex flex-row h-2/3">
                <div className="flex w-full p-4">
                    <div id='left' className="h-full flex-grow card bg-base-300 rounded-box justify-center items-center place-items-center">
                        left content
                    </div>
                    <div className="divider divider-horizontal bg-white bg-transparent"></div>
                    <div id='right' className="h-full flex-grow card bg-base-300 rounded-box place-items-center justify-center items-center">
                        right content
                    </div>
                </div>

            </div>
            <div className="divider"></div>
            <div id="lowerContainer" className="text-black h-1/3 flex justify-center items-center">
                status
            </div>
        </div>
    );
}

export {Game as default};