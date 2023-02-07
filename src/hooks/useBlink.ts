import { useState } from "react";

type BlinkProps= {
    delay: Number;
    duration: Number;
};

const useBlink = ({delay, duration}: BlinkProps) => {
    const [show, setShow] = useState(false);
    let tsStart = null;
    let tsEnd = null

    function start() {
        tsStart = new Date().getSeconds;
    }
    function stop() {
        tsEnd = new Date().getSeconds;
    }

}

export {useBlink}