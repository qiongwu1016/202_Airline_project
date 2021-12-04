import React from 'react';
import { Grid, Button, Form, Input, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: '',
                dateOfBirth: '',
                passportId: '',
                passpportNationality: '',
                address: {
                    streetAddress: '',
                    city: '',
                    state: '',
                    country: '',
                    zipcode: ''
                },
                role: {
                    customer: {
                        mileagePoints: 0
                    }
                }

            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleAddressChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        const currentState = user;
        currentState['address'][name] = value;
        this.setState({
            user: currentState
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password && user.email) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div>
                <Header as="h1">Create Account</Header>
                <Form name="form" onSubmit={this.handleSubmit}>
                    <Grid textAlign='left' columns={2} divided="vertically">
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h3'>Account Information</Header>
                                <Form.Field required error={submitted && !user.firstName}>
                                    <label>First Name</label>
                                    <Input 
                                        name="firstName"
                                        value={this.state.user.firstName}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field required error={submitted && !user.lastName}>
                                    <label>Last Name</label>
                                    <Input 
                                        name="lastName"
                                        value={this.state.user.lastName}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field required error={submitted && !user.email}>
                                    <label>Email</label>
                                    <Input 
                                        name="email"
                                        value={this.state.user.email}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field required error={submitted && !user.username}>
                                    <label>Username</label>
                                    <Input 
                                        name="username"
                                        value={this.state.user.username}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field required error={submitted && !user.password}>
                                    <label>Password</label>
                                    <Input 
                                        name="password"
                                        type="password"
                                        value={this.state.user.password}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h3'>Personal Information</Header>
                                <Form.Field>
                                    <label>Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={this.state.user.dateOfBirth}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Passport Number</label>
                                    <Input 
                                        name="passportId"
                                        value={this.state.user.passportId}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Passport Origin</label>
                                    <Input 
                                        name="passpportNationality"
                                        value={this.state.user.passpportNationality}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Header as='h4'>Home Address</Header>
                                <Form.Field>
                                    <label>Street Address</label>
                                    <Input 
                                        name="streetAddress"
                                        value={this.state.user.address.streetAddress}
                                        onChange={this.handleAddressChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>City</label>
                                    <Input 
                                        name="city"
                                        value={this.state.user.address.city}
                                        onChange={this.handleAddressChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>State</label>
                                    <Input 
                                        name="state"
                                        value={this.state.user.address.state}
                                        onChange={this.handleAddressChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Country</label>
                                    <Input 
                                        name="country"
                                        value={this.state.user.address.country}
                                        onChange={this.handleAddressChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Zip Code</label>
                                    <Input 
                                        name="zipcode"
                                        value={this.state.user.address.zipcode}
                                        onChange={this.handleAddressChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button>Register</Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button as={ Link } to="/login" >Back</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };