import React from 'react';
import { Grid, Segment, Button, Form, Input, Header, Table, Radio } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { flightActions } from '../_actions';

class FlightBook extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFlight: props.flight.selectedFlight,
            flightOptions: {
                departF: {
                    payment: 'money',
                    seat: ''
                },
                returnF: {
                    payment: 'money',
                    seat: ''
                }
            },
            submitted: false
        };

        this.handleBook = this.handleBook.bind(this);
        this.selectSeat = this.selectSeat.bind(this);
        this.handllePaymentType = this.handllePaymentType.bind(this);
    }

    handleBook() {
    }

    selectSeat(route, seatData) {
        if (route == "depart") {
            this.setState({
                flightOptions: {
                    ...this.state.flightOptions,
                    departF:{
                        ...this.state.flightOptions.departF,
                        seat: seatData.value
                    }
                }
            })
        } else if (route == "return") {
            this.setState({
                flightOptions: {
                    ...this.state.flightOptions,
                    returnF:{
                        ...this.state.flightOptions.returnF,
                        seat: seatData.value
                    }
                }
            })
        }
    }

    handllePaymentType(event, data, route) {
        if (route == "depart") {
            this.setState({
                flightOptions: {
                    ...this.state.flightOptions,
                    departF:{
                        ...this.state.flightOptions.departF,
                        payment: data.name
                    }
                }
            })
        }
        else if (route == "return") {
            this.setState({
                flightOptions: {
                    ...this.state.flightOptions,
                    returnF:{
                        ...this.state.flightOptions.returnF,
                        payment: data.name
                    }
                }
            })
        }
    }

    render() {
        const { departFlight, returnFlight } = this.state.selectedFlight;
        const { departF, returnF } = this.state.flightOptions;
        return (
            <Segment raised padded>
                <Form  name="form" onSubmit={this.handleBook}>
                    <Grid textAlign='center' divided="vertically">
                        <Header>Departure Flight</Header>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Airline</Table.HeaderCell>
                                    <Table.HeaderCell>Flight Number</Table.HeaderCell>
                                    <Table.HeaderCell>Route</Table.HeaderCell>
                                    <Table.HeaderCell>Departure Date</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell>Points</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{departFlight.airline}</Table.Cell>
                                    <Table.Cell>{departFlight.flightNumber}</Table.Cell>
                                    <Table.Cell>{departFlight.depAirport}-{departFlight.arrAirport}</Table.Cell>
                                    <Table.Cell>{departFlight.depDateTime}</Table.Cell>
                                    <Table.Cell>${(Math.round(departFlight.price.$numberDecimal * 100) / 100).toFixed(2)}</Table.Cell>
                                    <Table.Cell>{departFlight.price.$numberDecimal * 100}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <Form.Group widths='equal'>
                            <Grid textAlign='center' columns={2} divided="vertically">
                                <Grid.Row>
                                    <Grid.Column><b>Select Seat</b></Grid.Column>
                                    <Grid.Column>
                                        <Form.Select
                                            options={departFlight.aircraft.seats.map(seat => {
                                                const tempseat = {};
                                                if (seat.status === "available") {
                                                    tempseat['text'] = seat.rowNumber + seat.positionNumber;
                                                    tempseat['value'] = seat.rowNumber + seat.positionNumber;
                                                    return tempseat;
                                                }
                                            })}
                                            placeholder='Seat'
                                            onChange={(e, value) => this.selectSeat("depart", value)}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column><b>Pay With</b></Grid.Column>
                                    <Grid.Column>
                                        <Button.Group>
                                            <Button name="money" onClick={(e, name) => this.handllePaymentType(e, name, 'depart')} positive={departF.payment == 'money'}>$$</Button>
                                            <Button.Or />
                                            <Button name="point" onClick={(e, name) => this.handllePaymentType(e, name, 'depart')} positive={departF.payment == 'point'}>Points</Button>
                                        </Button.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form.Group>
                    </Grid>
                    {returnFlight && returnFlight !== "" &&
                    <Grid textAlign='center' divided="vertically">
                        <Header>Return Flight</Header>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Airline</Table.HeaderCell>
                                        <Table.HeaderCell>Flight Number</Table.HeaderCell>
                                        <Table.HeaderCell>Route</Table.HeaderCell>
                                        <Table.HeaderCell>Departure Date</Table.HeaderCell>
                                        <Table.HeaderCell>Price</Table.HeaderCell>
                                        <Table.HeaderCell>Points</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{returnFlight.airline}</Table.Cell>
                                        <Table.Cell>{returnFlight.flightNumber}</Table.Cell>
                                        <Table.Cell>{returnFlight.depAirport}-{returnFlight.arrAirport}</Table.Cell>
                                        <Table.Cell>{returnFlight.depDateTime}</Table.Cell>
                                        <Table.Cell>${(Math.round(returnFlight.price.$numberDecimal * 100) / 100).toFixed(2)}</Table.Cell>
                                        <Table.Cell>{returnFlight.price.$numberDecimal * 100}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <Form.Group widths='equal'>
                            <Grid textAlign='center' columns={2} divided="vertically">
                            <Grid.Row>
                                    <Grid.Column><b>Select Seat</b></Grid.Column>
                                    <Grid.Column>
                                        <Form.Select
                                            options={returnFlight.aircraft.seats.map(seat => {
                                                const tempseat = {};
                                                if (seat.status === "available") {
                                                    tempseat['text'] = seat.rowNumber + seat.positionNumber;
                                                    tempseat['value'] = seat.rowNumber + seat.positionNumber;
                                                    return tempseat;
                                                }
                                            })}
                                            placeholder='Seat'
                                            onChange={(e, value) => this.selectSeat("return", value)}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column><b>Pay With</b></Grid.Column>
                                    <Grid.Column>
                                        <Button.Group>
                                            <Button name="money" onClick={(e, name) => this.handllePaymentType(e, name, 'return')} positive={returnF.payment === 'money'}>$$</Button>
                                            <Button.Or />
                                            <Button name="point" onClick={(e, name) => this.handllePaymentType(e, name, 'return')} positive={returnF.payment === 'point'}>Points</Button>
                                        </Button.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form.Group>
                    </Grid>}
                    <Form.Button>Book</Form.Button>
                </Form>
            </Segment>
        )
    }

}

function mapState(state) {
    const { authentication, flight } = state;
    const { user } = authentication;
    return { user, flight };
}

const actionCreators = {
    toBook: flightActions.toBook,
}

const connectedFlightBook = connect(mapState, actionCreators)(FlightBook);
export { connectedFlightBook as FlightBook };