import { User } from "firebase/auth";
import { createContext } from "react";

const initialUserState: User | null = null;
const UserContext = createContext<User | null>(initialUserState);


const UserProvider = UserContext.Provider;
const UserConsumner = UserContext.Consumer;


type ActionType = 'SET_USER' | 'CLEAR_USER'
type UserAction = { type: ActionType, payload: User | null };

function userReducer(user: User | null, action: UserAction) {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'CLEAR_USER':
            return null;
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

