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

  const [user, setUser] = useState<Player | null | Boolean>(true);
  //todo: change value to null
  const [showGame, setShowGame] = useState(false);
  useEffect(() => {
    const timeoutSec = Math.ceil(Math.random() * 5);
    if (user) {
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
  }, [user]);
  return (
    <div className="">
      {user ? <Game {...{ status: showGame, player: user }} /> : <EmailForm />}
    </div>
  );
}

export default Index;
