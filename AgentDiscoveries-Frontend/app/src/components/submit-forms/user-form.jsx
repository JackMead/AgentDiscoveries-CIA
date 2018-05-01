import * as React from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';

export class CreateUser extends React.Component {
    
    constructor(props) {
        super();

        // TODO: props modification
        this.submitForm = props.submitForm;
    }

    render() {
        return (
            <div className="col-md-12">
                <Form onSubmit={this.props.onSubmit}>
                    <h3>Create User</h3>
                    <FormGroup>
                        <FormControl type="text" inputRef={username => this.submitForm.username = username} placeholder="enter username" />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="password" inputRef={password => this.submitForm.password = password} placeholder="enter password" />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}