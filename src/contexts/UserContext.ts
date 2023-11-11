import { User } from "firebase/auth";
import { createContext } from "react";


interface UserState {
    isloading: boolean;
    user: User | null;
}

const initialUserState: UserState = { isloading: true, user: null };
const UserContext = createContext<UserState>(initialUserState);


const UserProvider = UserContext.Provider;
const UserConsumner = UserContext.Consumer;


type ActionType = 'SET_USER' | 'CLEAR_USER'
interface UserAction {
    type: ActionType
    payload: User | null
}

function userReducer(_: UserState | null, action: UserAction) {
    switch (action.type) {
        case 'SET_USER':
            return { isloading: false, user: action.payload };
        case 'CLEAR_USER':
            return { isloading: false, user: null };
        default:
            throw new Error();
    }
}

const UserDispatchContext = createContext((() => { }) as React.Dispatch<UserAction>);
const UserDispatchProvider = UserDispatchContext.Provider;
const UserDispatchConsumer = UserDispatchContext.Consumer;

export {
    UserConsumner, UserContext, UserDispatchConsumer, UserDispatchContext,
    UserDispatchProvider, UserProvider, initialUserState, userReducer
};

