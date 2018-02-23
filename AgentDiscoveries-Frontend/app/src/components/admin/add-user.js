import * as React from "react"
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap"

export class AddUser extends React.Component {
    
    constructor(props) {
        super()
        this.state = {
            onSubmit: props.onSubmit,
        }

        this.submitForm = props.submitForm
    }

    render(props) {
        return (
            <div className="col-md-12">
                <Form onSubmit={this.state.onSubmit}>
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
        )
    }
}