import React from 'react';
import { Grid, Segment, Button, Form, Input, Header, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { flightActions } from '../_actions';
import { airportActions } from '../_actions';

class FlightSearch extends React.Component {
    componentDidMount() {
        this.props.getAirports();
    }

    constructor(props) {
        super(props);

        this.state = {
            flights: props.flight.flights,
            search: {
                oneway: true,
                roundTrip: false,
                departAirport: '',
                arrivalAirport: '',
                departDate: '',
                returnDate: ''
            },
            submitted: false
        };

        this.handleTripType = this.handleTripType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { search } = this.state;
        this.setState({
            search: {
                ...search,
                [name]: value
            }
        });
    }

    handleTripType(event, data) {
        if (data.name == "one way") {
            this.setState({
                search: {
                    ...this.state.search,
                    oneway: true,
                    roundTrip: false
                },
                submitted: false
            })
        }
        else if (data.name == "round trip") {
            this.setState({
                search: {
                    ...this.state.search,
                    oneway: false,
                    roundTrip: true
                },
                submitted: false
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { search } = this.state;
        if (search.departAirport && search.arrivalAirport && search.departDate) {
            this.props.search(search);
        }
    }

    render() {
        const { airport } = this.props.airport;
        const { submitted, search } = this.state;
        const { flights } = this.props.flight
        return (
            <div>
                <Segment raised padded>
                    <Grid textAlign='center' divided="vertically">
                        <Button.Group>
                            <Button name="one way" onClick={this.handleTripType} positive={this.state.search.oneway}>One Way</Button>
                            <Button.Or />
                            <Button name="round trip" onClick={this.handleTripType} positive={this.state.search.roundTrip}>Round Trip</Button>
                        </Button.Group>
                    </Grid>
                    <Grid textAlign='center' column={2} divided="vertically">
                        <Form name="form" onSubmit={this.handleSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Field required error={submitted && !search.departAirport}>
                                    <label>From</label>
                                    <Input
                                        name="departAirport"
                                        list='airport'
                                        value={this.state.search.departAirport}
                                        onChange={this.handleChange}/>
                                    <datalist id='airport'>
                                        {airport && airport.map(function(name, index) {
                                            return <option key={index} value={name}>{name}</option>
                                        })}
                                    </datalist>
                                </Form.Field>
                                <Form.Field required error={submitted && !search.arrivalAirport}>
                                        <label>To</label>
                                        <Input
                                            name="arrivalAirport"
                                            list='airport'
                                            value={this.state.search.arrivalAirport}
                                            onChange={this.handleChange}/>
                                            <datalist id='airport'>
                                            {airport && airport.map(function(name, index) {
                                                return <option key={index} value={name}>{name}</option>
                                                })}
                                            </datalist>
                                    </Form.Field>
                            </Form.Group> 
                            <Form.Group widths='equal'>
                                <Form.Field required error={submitted && !search.departDate}>
                                    <label>Departure Date</label>
                                    <input
                                        type="date"
                                        name="departDate"
                                        value={this.state.search.departDate}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                {this.state.search.roundTrip &&
                                <Form.Field required error={submitted && !search.returnDate}>
                                    <label>Return Date</label>
                                    <input
                                        type="date"
                                        name="returnDate"
                                        value={this.state.search.returnDate}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>}
                            </Form.Group>
                            <Button>Search</Button>
                            <Button as={ Link } to="/" >Back</Button>
                        </Form>
                    </Grid>
                </Segment>
                {flights && submitted && flights.departFlights.length > 0 &&
                <Segment raised padded>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Airline</Table.HeaderCell>
                                <Table.HeaderCell>Flight Number</Table.HeaderCell>
                                <Table.HeaderCell>Route</Table.HeaderCell>
                                <Table.HeaderCell>Departure Date</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {flights.departFlights.map(function(flight, index) {
                                return <Table.Row key={index}>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>{flight.airline}</Table.Cell>
                                    <Table.Cell>{flight.flightNumber}</Table.Cell>
                                    <Table.Cell>{flight.depAirport}-{flight.arrAirport}</Table.Cell>
                                    <Table.Cell>{flight.depDateTime}</Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                    </Segment>
                }
                {flights && submitted && search.roundTrip && flights.returnFlights.length > 0 &&
                <Segment raised padded>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Airline</Table.HeaderCell>
                                <Table.HeaderCell>Flight Number</Table.HeaderCell>
                                <Table.HeaderCell>Route</Table.HeaderCell>
                                <Table.HeaderCell>Departure Date</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {flights.returnFlights.map(function(flight, index) {
                                return <Table.Row key={index}>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>{flight.airline}</Table.Cell>
                                    <Table.Cell>{flight.flightNumber}</Table.Cell>
                                    <Table.Cell>{flight.depAirport}-{flight.arrAirport}</Table.Cell>
                                    <Table.Cell>{flight.depDateTime}</Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                    </Segment>
                }   
            </div>
        )
    }

}

function mapState(state) {
    const { authentication, flight, airport } = state;
    const { user } = authentication;
    return { user, flight, airport };
}

const actionCreators = {
    search: flightActions.search,
    getAirports: airportActions.getAll
}

const connectedFlightSearch = connect(mapState, actionCreators)(FlightSearch);
export { connectedFlightSearch as FlightSearch };