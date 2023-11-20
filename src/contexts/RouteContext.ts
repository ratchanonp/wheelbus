import { createContext } from "react";

const intialDirectionRendererOptionContext: google.maps.DirectionsRendererOptions = {};


const DirectionRendererContext = createContext<google.maps.DirectionsRendererOptions>(intialDirectionRendererOptionContext);
const DirectionRendererProvider = DirectionRendererContext.Provider;
const DirectionRendererConsumer = DirectionRendererContext.Consumer;

type ActionType = 'SET_DIRECTION' | 'CLEAR_DIRECTION' | 'PICK_DIRECTION_INDEX'

interface DirectionRendererAction {
    type: ActionType
    payload?: google.maps.DirectionsRendererOptions
}

function directionRendererReducer(rendererOption: google.maps.DirectionsRendererOptions, action: DirectionRendererAction) {
    switch (action.type) {
        case 'SET_DIRECTION':
            return action.payload;
        case 'CLEAR_DIRECTION':
            return {};
        case 'PICK_DIRECTION_INDEX':
            if (!action.payload) {
                throw new Error('payload is undefined');
            }
            return { ...rendererOption, routeIndex: action.payload.routeIndex };
        default:
            throw new Error();
    }
}

const DirectionRendererDispatchContext = createContext((() => { }) as React.Dispatch<DirectionRendererAction>);
const DirectionRendererDispatchProvider = DirectionRendererDispatchContext.Provider;
const DirectionRendererDispatchConsumer = DirectionRendererDispatchContext.Consumer;

export { DirectionRendererConsumer, DirectionRendererContext, DirectionRendererDispatchConsumer, DirectionRendererDispatchContext, DirectionRendererDispatchProvider, DirectionRendererProvider, directionRendererReducer, intialDirectionRendererOptionContext };

