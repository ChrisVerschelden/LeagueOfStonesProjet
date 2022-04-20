
import { currentConnectedUser } from "./queries";

export const isAuth = async (session) => {
    const response = await currentConnectedUser(session);
    const data = await response.json();
    return ("connectedUser" in data && "email" in data.connectedUser && "name" in data.connectedUser);
};
