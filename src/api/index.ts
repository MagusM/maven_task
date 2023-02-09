import { Player } from "~/models/game";

const POST = 'post';
const GET  = 'get';

const fetcher = async (endpoint:string, method=GET, body?:any) => {
    const url = `${import.meta.env.VITE_SERVER_HOST}/${endpoint}`;
    return fetch(url, {
        body: method === POST ? JSON.stringify(body) : null,
        method: method
    }).then(res => res.json()).catch(e => console.log({e}));
}

const getLeaderBoard = async () => {
    const data = await fetcher('leaderboard');

    return data;
}

const addNewPlayer = async (user: Player) => {
    const data = await fetcher('users', POST, {user});

    return data;
}

const updatePlayer = async (user: Player) => {
    const data = await fetcher('updateUser', POST, { user });

    return data;
}

export {
    getLeaderBoard,
    addNewPlayer,
    updatePlayer
}