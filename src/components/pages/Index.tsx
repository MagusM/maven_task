import { Dialog } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import { Player } from '~/models/game';
import EmailForm from '../EmailForm';
import Game from '../game/Game';
import Loading from '../shared/Loading';

function Index() {

  /**
   * I need to check if user entered valid email/signedin
   * if not - enter email first
   * if email is entered - load the game
   * render cond ?
   */

  const [player, setPlayer] = useState<Player | null | boolean>(true);
  //todo: change value to null
  const [showGame, setShowGame] = useState(false);
  useEffect(() => {
    const timeoutSec = Math.ceil(Math.random() * 5);
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
