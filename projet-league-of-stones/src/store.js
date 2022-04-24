import { createStore } from 'redux';

console.log(localStorage);

const initialState = {
    session: sessionStorage.getItem('session') || null,
    name: localStorage['name'] || null,
    email: localStorage['email'] || null,
    lang: "FR"
};

export const userDisconnect = () => {
    sessionStorage.removeItem('session');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    return (
        {type: "userDisconnect"}
    );
};

export const userConnect = (token, email, name) =>{
    sessionStorage.setItem('session', token);
    localStorage.setItem('email', email);
    localStorage.setItem('name', name);
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
    console.log("state");
    console.log(state);
    return state;
};

export const store = createStore(reducer, initialState);