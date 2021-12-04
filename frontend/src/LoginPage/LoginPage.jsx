import React from 'react';
import { Button, Divider, Form, Grid, Segment, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-12">
                <Segment>
                    <Header as='h2' icon>
                        <Icon name='travel' />
                        Team5 Airline
                    </Header>
                </Segment>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Form name="form" onSubmit={this.handleSubmit}>
                            <Form.Input
                                type="text"
                                name="username"
                                label="Username"
                                value={username}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                            <Button content='Login' primary />
                            </Form>
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Button as={ Link } to="/register" content='Sign up' icon='signup' size='big'/>
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>Or</Divider>
                </Segment>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };