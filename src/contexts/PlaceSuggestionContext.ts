import { createContext } from "react";

export interface PlaceSuggestionContextData {
    placeSuggestions: google.maps.places.AutocompletePrediction[];
}

export const initialPlaceSuggestionContextData: PlaceSuggestionContextData = {
    placeSuggestions: [],
};

export const PlaceSuggestionContext = createContext<PlaceSuggestionContextData>(initialPlaceSuggestionContextData);
export const PlaceSuggestionContextProvider = PlaceSuggestionContext.Provider;
export const PlaceSuggestionContextConsumer = PlaceSuggestionContext.Consumer;

// Reducer
export const SET_PLACE_SUGGESTIONS = "SET_PLACE_SUGGESTIONS";
export const CLEAR_PLACE_SUGGESTIONS = "CLEAR_PLACE_SUGGESTIONS";

export type PlaceSuggestionReducerActionType = typeof SET_PLACE_SUGGESTIONS | typeof CLEAR_PLACE_SUGGESTIONS;

export interface PlaceSuggestionReducerAction {
    type: PlaceSuggestionReducerActionType;
    payload?: Partial<PlaceSuggestionContextData>;
}

export const placeSuggestionReducer = (state: PlaceSuggestionContextData, action: PlaceSuggestionReducerAction): PlaceSuggestionContextData => {
    switch (action.type) {
        case SET_PLACE_SUGGESTIONS:
            if (action.payload === undefined || action.payload.placeSuggestions === undefined) { return state; }
            return { ...state, placeSuggestions: action.payload.placeSuggestions };
        case CLEAR_PLACE_SUGGESTIONS:
            return { ...state, placeSuggestions: [] };
        default:
            return state;
    }
};

export const PlaceSuggestionReducerContext = createContext<React.Dispatch<PlaceSuggestionReducerAction>>(() => { });
export const PlaceSuggestionReducerProvider = PlaceSuggestionReducerContext.Provider;
export const PlaceSuggestionReducerConsumer = PlaceSuggestionReducerContext.Consumer;