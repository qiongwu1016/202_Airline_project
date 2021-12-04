import { airportConstants } from "../_constants";
import { airportService } from "../_services";
import { alertActions } from ".";
import { history } from "../_helpers";

export const airportActions = {
    getAll
}

function getAll() {
    return dispatch => {
        dispatch(request());
        airportService.getAll()
            .then(
                airport => dispatch(success(airport)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return {type: airportConstants.SEARCHAIRPORT_REQUEST}}
    function success(airport) { return {type: airportConstants.SEARCHAIRPORT_SUCCESS, airport}}
    function failure(error) { return {type: airportConstants.SEARCHAIRPORT_FAILURE, error}}
    
}