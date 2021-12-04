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
        case flightConstants.TOBOOKFLIGHT_REQUEST:
            return {};
        case flightConstants.TOBOOKFLIGHT_SUCCESS:
            return {
                ...state,
                selectedFlight: action.selectedFlight
            };
        case flightConstants.TOBOOKFLIGHT_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

