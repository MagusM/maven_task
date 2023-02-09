import { Player } from "~/models/game";

const POST = 'POST';
const GET  = 'GET';

const fetcher = async (endpoint:string, method=GET, body?:any) => {
    const url = `${import.meta.env.VITE_SERVER_HOST}/${endpoint}`;
    return fetch(url, {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        method: method
    }).then(res => res.json()).catch(e => console.log('error fetching'));
}

const getLeaderBoard = async () => {
    const data = await fetcher('leaderboard');

    return data;
}

const upsertUser = async (user: Player) => {
    console.log(user);
    const data = await fetcher('upsertUser', POST, {user});

    return data;
}

export {
    getLeaderBoard,
    upsertUser
}