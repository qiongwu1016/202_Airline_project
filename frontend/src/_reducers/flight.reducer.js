import { flightConstants } from '../_constants';

export function flight(state = {flights: { departFlights : [], returnFlights: []}}, action) {
    switch (action.type) {
        case flightConstants.SEARCHFLIGHT_REQUEST:
            return {
                searching: true
            };
        case flightConstants.SEARCHFLIGHT_SUCCESS:
            return {
                ...state,
                flights: action.flights,
                searching: false
            };
        case flightConstants.SEARCHFLIGHT_FAILURE:
            return {
                error:action.error
            }
        default:
            return state
    }
}

