export interface Game {
    player: string;
    score: number;
}

export interface Player {
    email: string;
    timesPlayed: number;
    highestScore: number;
    name?: string;
}
export interface Status {
    stateType: string;
    message: string;
}