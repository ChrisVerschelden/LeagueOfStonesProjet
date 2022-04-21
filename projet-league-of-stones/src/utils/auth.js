
import { currentConnectedUser } from "./queries";

export const isAuth = async (session) => {
    const response = await currentConnectedUser(session);
    const data = await response.json();
    console.log("is Auth");
    console.log(data);
    return ("connectedUser" in data && "email" in data.connectedUser && "name" in data.connectedUser);
};

export const getUserInfo = async (session) => {

    if (session) {
        const response = await currentConnectedUser(session);
        const data = await response.json();
        return data;
    }
};
