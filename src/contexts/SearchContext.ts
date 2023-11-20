import { createContext } from "react";

export type focusedInputType = "from" | "to" | null;

export interface SearchContextData {
    from: string;
    fromPlaceId: string;
    to: string;
    toPlaceId: string;
    focusedInput: focusedInputType;
}

export const initialSearchContextData: SearchContextData = {
    from: "",
    fromPlaceId: "",
    to: "",
    toPlaceId: "",
    focusedInput: null
};

export const SearchContext = createContext<SearchContextData>(initialSearchContextData);
export const SearchContextProvider = SearchContext.Provider;
export const SearchContextConsumer = SearchContext.Consumer;

// Reducer
export const SET_FROM = "SET_FROM";
export const SET_FROM_PLACE_ID = "SET_FROM_PLACE_ID";
export const SET_TO = "SET_TO";
export const SET_TO_PLACE_ID = "SET_TO_PLACE_ID";
export const CLEAR_FROM = "CLEAR_FROM";
export const CLEAR_TO = "CLEAR_TO";
export const CLEAR_ALL = "CLEAR_ALL";
export const SWAP = "SWAP";
export const SET_FOCUSED_INPUT = "SET_FOCUSED_INPUT";
export const CLEAR_FOCUSED_INPUT = "CLEAR_FOCUSED_INPUT";

export type SearchReducerActionType = typeof SET_FROM | typeof SET_FROM_PLACE_ID | typeof SET_TO | typeof SET_TO_PLACE_ID | typeof CLEAR_FROM | typeof CLEAR_TO | typeof CLEAR_ALL | typeof SWAP | typeof SET_FOCUSED_INPUT | typeof CLEAR_FOCUSED_INPUT;

export interface SearchReducerAction {
    type: SearchReducerActionType;
    payload?: Partial<SearchContextData>;
}

export const searchReducer = (state: SearchContextData, action: SearchReducerAction): SearchContextData => {
    switch (action.type) {
        case SET_FROM:
            if (action.payload === undefined || action.payload.from === undefined) { return state; }
            return { ...state, from: action.payload.from };
        case SET_FROM_PLACE_ID:
            if (action.payload === undefined || action.payload.fromPlaceId === undefined) { return state; }
            return { ...state, fromPlaceId: action.payload.fromPlaceId };
        case SET_TO:
            if (action.payload === undefined || action.payload.to === undefined) { return state; }
            return { ...state, to: action.payload.to };
        case SET_TO_PLACE_ID:
            if (action.payload === undefined || action.payload.toPlaceId === undefined) { return state; }
            return { ...state, toPlaceId: action.payload.toPlaceId };
        case CLEAR_FROM:
            return { ...state, from: "", fromPlaceId: "" };
        case CLEAR_TO:
            return { ...state, to: "", toPlaceId: "" };
        case CLEAR_ALL:
            return { from: "", fromPlaceId: "", to: "", toPlaceId: "", focusedInput: null };
        case SWAP:
            return { ...state, from: state.to, fromPlaceId: state.toPlaceId, to: state.from, toPlaceId: state.fromPlaceId };
        case SET_FOCUSED_INPUT:
            if (action.payload === undefined || action.payload.focusedInput === undefined) { return state; }
            return { ...state, focusedInput: action.payload.focusedInput };
        case CLEAR_FOCUSED_INPUT:
            return { ...state, focusedInput: null };
        default:
            return state;
    }
}

export const SearchDispatchContext = createContext((() => { }) as React.Dispatch<SearchReducerAction>);
export const SearchDispatchProvider = SearchDispatchContext.Provider;
export const SearchDispatchConsumer = SearchDispatchContext.Consumer;


