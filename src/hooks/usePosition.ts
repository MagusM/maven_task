import { useState } from "react";
import { LEFT, randomBetweenZeroAnd, RIGHT } from "~/components/utils";

const usePosition = () => {
    const [position, setPosition] = useState<string | null>(null);

    function randomAndSetPosition() {
        const randomRes = randomBetweenZeroAnd(1);
        setPosition(randomRes === 1 ? RIGHT : LEFT);
    }

    function resetPosition() {
        setPosition(null);
    }

    return {
        position,
        randomAndSetPosition,
        resetPosition
    }
}

export default usePosition;