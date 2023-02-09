import { useEffect, useMemo, useState } from "react";
import { LEFT, randomBetweenZeroAnd, RIGHT } from "~/components/utils";

const map = {
    0: LEFT,
    1: RIGHT
}

const usePosition = () => {
    const [position, setPosition] = useState<string>();

    useEffect(() => {
        console.log(`usePosition, position is now: ${position}`);
    }, [position]);

    const randomAndSetPosition = () => {
        const randomRes = randomBetweenZeroAnd(1);
        setPosition(map[randomRes]);
    }

    const resetPosition = () => {
        setPosition(undefined);
    }

    const pos = useMemo(() => position, [position]);

    return {
        position: pos,
        randomAndSetPosition,
        resetPosition
    }
}

export default usePosition;