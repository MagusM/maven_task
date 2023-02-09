import { Status as StatusI } from "~/models/game";
import { MISTAKE } from "../utils";

const StatusElement = (status: StatusI) => {
    if (status.stateType === '') {
        return null;
    }
    if (status.stateType === MISTAKE) {
        return (
            <div className="alert alert-error shadow-lg">
                <span className="text-black">{status.message}</span>
            </div>
        );
    }

    return (
        <div className="alert alert-success shadow-lg">
            <span className="text-black">{status.message}</span>
        </div>
    );
    
}

export default StatusElement;