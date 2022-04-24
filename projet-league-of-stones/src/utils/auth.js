
import { currentConnectedUser } from "./queries";

export const isAuth = async (session) => {
    const response = await currentConnectedUser(session);
    const data = await response.json();
    return (data && "connectedUser" in data && data.connectedUser !== null && "email" in data.connectedUser && "name" in data.connectedUser);
};

export const getUserInfo = async (session) => {

    if (session) {
        const response = await currentConnectedUser(session);
        const data = await response.json();
        return data;
    }
};
