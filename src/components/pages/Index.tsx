import { Dialog } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import { Player } from '~/models/game';
import EmailForm from '../EmailForm';
import Game from '../game/Game';
import Loading from '../shared/Loading';
import { randomBetweenZeroAnd } from '../utils';

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
      {player ? <Game {...{ gameStatus: showGame, player: player as Player }} /> : <EmailForm />}
    </div>
  );
}

export default Index;
