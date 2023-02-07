export const MISTAKE   = 'mistake';
export const SUCCESS   = 'success';
export const TOO_SOON  = 'Too Soon';
export const WRONG_KEY = 'Wrong Key';
export const TOO_LATE  = 'Too Late';
export const BLINK_DURATION = 1000; //1 sec
export const BLINK_DELAY = 5000; //2 sec

export function randomBetweenZeroAnd(num: number) {
    return Math.floor(Math.random() * (num+1));
}
