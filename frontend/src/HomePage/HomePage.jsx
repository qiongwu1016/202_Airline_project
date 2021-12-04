import React from 'react';
import { Grid, Segment, Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <Segment raised>
                    <Grid textAlign='center' columns={3} divided="vertically">
                        <Grid.Row stretched>
                            <Grid.Column>
                            <Segment><span><strong>Passenger Name: </strong></span><span>{user.firstName + ' ' + user.lastName}</span></Segment>
                            </Grid.Column>
                            <Grid.Column/>
                            <Grid.Column>
                                <Segment><span><strong>Mileage Rewards: </strong></span><span>{user.role.customer.mileagePoints}</span></Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment raised>
                    <Grid textAlign='center' columns={3} divided="vertically">
                        <Grid.Row stretched>
                            <Grid.Column/>
                            <Grid.Column>
                                <Segment><span><strong>Upcoming Flights</strong></span></Segment>
                            </Grid.Column>
                            <Grid.Column/>
                        </Grid.Row>
                    </Grid>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell>Flight Number</Table.HeaderCell>
                                        <Table.HeaderCell>From-To</Table.HeaderCell>
                                        <Table.HeaderCell>Departure Time</Table.HeaderCell>
                                        <Table.HeaderCell>Arrival Time</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                    <Table.Row>
                                        <Table.Cell><Button>Manage Flight</Button></Table.Cell>
                                        <Table.Cell>ABC12345</Table.Cell>
                                        <Table.Cell>SFO-LAX</Table.Cell>
                                        <Table.Cell>11/20/2022 10:00 AM</Table.Cell>
                                        <Table.Cell>11/20/2022 11:00 AM</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><Button>Manage Flight</Button></Table.Cell>
                                        <Table.Cell>ABC12345</Table.Cell>
                                        <Table.Cell>SFO-LAX</Table.Cell>
                                        <Table.Cell>11/20/2022 10:00 AM</Table.Cell>
                                        <Table.Cell>11/20/2022 11:00 AM</Table.Cell>
                                    </Table.Row>                                    
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Segment>
                <Segment raised>
                    <Grid textAlign='center' columns={3} divided="vertically">
                        <Grid.Row stretched>
                            <Grid.Column/>
                            <Grid.Column>
                                <Button as={ Link } to="/flight_search">Search New Flights</Button>
                            </Grid.Column>
                            <Grid.Column/>
                        </Grid.Row>
                        <Grid.Row stretched>
                            <Grid.Column>
                                <Button as={ Link } to="/manage_account">Manager Account</Button>
                            </Grid.Column>
                            <Grid.Column/>
                            <Grid.Column>
                                <Button as={ Link } to="/login" >Sign Out</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const connectedHomePage = connect(mapState)(HomePage);
export { connectedHomePage as HomePage };