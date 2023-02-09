import { useState } from "react";
import { Status as StatusI } from "~/models/game";

const initialStatusObject:StatusI = {
    message: '',
    stateType: ''
};

const useStatus = () => {
    const [status, setStatus] = useState<StatusI>(initialStatusObject);

    function updateStatus(status: StatusI) {
        setStatus(status);
    }

    function resetStatus() {
        setStatus(initialStatusObject);
    }

    return {
        status,
        updateStatus,
        resetStatus
    }
}

export default useStatus;