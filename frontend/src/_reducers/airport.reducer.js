import { airportConstants } from '../_constants';

export function airport(state = {}, action) {
    switch (action.type) {
        case airportConstants.SEARCHAIRPORT_REQUEST:
            return {
                searching: true
            };
        case airportConstants.SEARCHAIRPORT_SUCCESS:
            return {
                ...state,
                airport: action.airport,
                searching: false
            };
        case airportConstants.SEARCHAIRPORT_FAILURE:
            return {
                error:action.error
            }
        default:
            return state
    }
}

