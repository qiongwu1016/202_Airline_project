import { flightConstants } from "../_constants";
import { flightService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const flightActions = {
    search,
    toBook
}

function search(param) {
    return dispatch => {
        dispatch(request());

        flightService.search(param)
            .then(
                flights => {
                    dispatch(success(flights));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: flightConstants.SEARCHFLIGHT_REQUEST } }
    function success(flights) { return { type: flightConstants.SEARCHFLIGHT_SUCCESS, flights } }
    function failure(error) { return { type: flightConstants.SEARCHFLIGHT_FAILURE, error } }
}

function toBook(selectedFlight) {
    return dispatch => {
        dispatch(request());

        dispatch(success(selectedFlight));
        history.push('/flight_book');
    }
    function request() { return { type: flightConstants.TOBOOKFLIGHT_REQUEST } }
    function success(selectedFlight) { return { type: flightConstants.TOBOOKFLIGHT_SUCCESS, selectedFlight } }
    function failure(error) { return { type: flightConstants.TOBOOKFLIGHT_FAILURE, error } }
}