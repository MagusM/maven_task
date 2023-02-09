import { useCallback, useEffect, useRef, useState } from 'react';
import { Player } from '~/models/game';
import Game from '../game/Game';
import { randomBetweenZeroAnd } from '../utils';
import NameForm from '../NameForm';

function Index() {
  //todo: change value to null
  const [player, setPlayer] = useState<Player | null>(null);
  const [showGame, setShowGame] = useState(false);
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

  const onNameSubmit = useCallback((name: string) => {
    setPlayer({
      name,
      score: 0
    })
  }, []);

  useEffect(() => {
    setShowGame(!!player);
  }, [player]);

  return (
    <div className="">
      {player ? <Game {...{ gameToRun: showGame, player: player as Player }} /> : <NameForm onSubmit={onNameSubmit} />}
    </div>
  );
}

export default Index;
