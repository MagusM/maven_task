import { useEffect, useRef, useState } from 'react';
import { Player } from '~/models/game';
import Game from '../game/Game';
import { randomBetweenZeroAnd } from '../utils';
import NameForm from '../NameForm';

function Index() {
  //todo: change value to null
  const [player, setPlayer] = useState<Player | null | boolean>(true);
  const [showGame, setShowGame] = useState(true);
  useEffect(() => {
    const timeoutSec = randomBetweenZeroAnd(4) + 1;
    if (player) {
      setTimeout(() => {
        setShowGame(true)
      }, timeoutSec);
    } else {
      setShowGame(false);
    }

    //cleanup
    return () => {
      setShowGame(false);
    }
  }, [player]);
  return (
    <div className="">
      {player ? <Game {...{ gameToRun: showGame, player: player as Player }} /> : <NameForm />}
    </div>
  );
}

export default Index;
