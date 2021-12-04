import React from 'react';
import { Grid, Segment, Button, Form, Input, Header, Table, Radio } from 'semantic-ui-react';
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
            selectedFlight: {
                departFlight: '',
                returnFlight: ''
            },
            submitted: false
        };

        this.handleTripType = this.handleTripType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleBook = this.handleBook.bind(this);
        this.handleFlightRadio = this.handleFlightRadio.bind(this);
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

    handleFlightRadio(event, data, flight, index) {
        if (data.name == 'departGroup') {
            this.setState({
                selectedFlight: {
                    ...this.state.selectedFlight,
                    departFlight: flight
                }
            })
        } else if (data.name == 'returnGroup') {
            this.setState({
                selectedFlight: {
                    ...this.state.selectedFlight,
                    returnFlight: flight
                }
            })
        }
    }

    handleSearch(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { search } = this.state;
        if (search.departAirport && search.arrivalAirport && search.departDate) {
            this.props.search(search);
        }
    }

    handleBook(event) {
        event.preventDefault();
        
        this.setState({ submitted: true });
        const { selectedFlight } = this.state;
        if (selectedFlight.departFlight) {
            this.props.toBook(selectedFlight);
        }
    }

    render() {
        const { airport } = this.props.airport;
        const { submitted, search, selectedFlight } = this.state;
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
                        <Form name="form" onSubmit={this.handleSearch}>
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
                <Form name="bookForm" onSubmit={this.handleBook}>
                    <Segment raised padded>
                        <Header>Departure Flights</Header>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Airline</Table.HeaderCell>
                                    <Table.HeaderCell>Flight Number</Table.HeaderCell>
                                    <Table.HeaderCell>Route</Table.HeaderCell>
                                    <Table.HeaderCell>Departure Date</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {flights.departFlights.map((flight, index) => {
                                        return (<Table.Row key={index}>
                                        <Table.Cell>
                                            <Radio 
                                                name='departGroup'
                                                value={flight.flightId}
                                                checked={selectedFlight.departFlight.flightId === flight.flightId}
                                                onChange={(e, value) => this.handleFlightRadio(e, value, flight, index)}
                                                />
                                        </Table.Cell>
                                        <Table.Cell>{flight.airline}</Table.Cell>
                                        <Table.Cell>{flight.flightNumber}</Table.Cell>
                                        <Table.Cell>{flight.depAirport}-{flight.arrAirport}</Table.Cell>
                                        <Table.Cell>{flight.depDateTime}</Table.Cell>
                                        <Table.Cell>${(Math.round(flight.price.$numberDecimal * 100) / 100).toFixed(2)}</Table.Cell>
                                        
                                    </Table.Row>)
                                })}
                            </Table.Body>
                        </Table>
                        {flights && submitted && search.roundTrip && flights.returnFlights.length > 0 &&
                            <div><Header>Returning Flights</Header>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell>Airline</Table.HeaderCell>
                                        <Table.HeaderCell>Flight Number</Table.HeaderCell>
                                        <Table.HeaderCell>Route</Table.HeaderCell>
                                        <Table.HeaderCell>Departure Date</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {flights.returnFlights.map((flight, index) => {
                                    return (<Table.Row key={index}>
                                        <Table.Cell>
                                            <Radio 
                                                name='returnGroup'
                                                value={flight.flightId}
                                                checked={selectedFlight.returnFlight.flightId === flight.flightId}
                                                onChange={(e, value) => this.handleFlightRadio(e, value, flight, index)}
                                                />
                                        </Table.Cell>
                                        <Table.Cell>{flight.airline}</Table.Cell>
                                        <Table.Cell>{flight.flightNumber}</Table.Cell>
                                        <Table.Cell>{flight.depAirport}-{flight.arrAirport}</Table.Cell>
                                        <Table.Cell>{flight.depDateTime}</Table.Cell>
                                        <Table.Cell>${(Math.round(flight.price.$numberDecimal * 100) / 100).toFixed(2)}</Table.Cell>
                                    </Table.Row>)
                                })}
                                </Table.Body>
                            </Table>
                            </div>
                        }
                        <Button>Book</Button>
                    </Segment>
                </Form>
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
    toBook: flightActions.toBook,
    getAirports: airportActions.getAll
}

const connectedFlightSearch = connect(mapState, actionCreators)(FlightSearch);
export { connectedFlightSearch as FlightSearch };