import { createStore } from 'redux';

const initialState = {
    session: "",
    name: "",
    email: ""
};

export const userDisconnect = () => ({type: "userDisconnect"});
export const userConnect = (token, email, name) =>{
    console.log(`userConnect funct token: ${token}, email: ${email}, name: ${name}`);
    return ({
        type: "userConnect",
        payload: {session: token, email: email, name: name}
    });
}

const reducer = (state = initialState, action) => {
    console.log(action);
    if (action.type === "userDisconnect") {
        return initialState;
    }
    if (action.type === "userConnect") {
        console.log("if userConnect");
        console.log(action.payload);
        const obj = {
            ...state,
            session: action.payload.session,
            email: action.payload.email,
            name: action.payload.name,
        };
        console.log("obj");
        console.log(obj);
        return obj;
    }
    console.log("no action:");
    return state;
};

export const store = createStore(reducer, initialState);