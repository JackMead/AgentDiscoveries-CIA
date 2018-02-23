import * as React from "react"
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap"

export class EditLocation extends React.Component {

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
                    <h3>Create Location</h3>

                    <FormGroup>
                        <ControlLabel>Site Name</ControlLabel>
                        <FormControl type="text" required
                            inputRef={siteName => this.submitForm.siteName = siteName}
                            defaultValue={this.props.location.siteName}
                            placeholder="enter site name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Location Name</ControlLabel>
                        <FormControl type="text" required
                            inputRef={location => this.submitForm.location = location}
                            defaultValue={this.props.location.location}
                            placeholder="enter location name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Time Zone</ControlLabel>
                        <FormControl type="text" required
                            inputRef={timeZone => this.submitForm.timeZone = timeZone}
                            defaultValue={this.props.timeZone.timeZone}
                            placeholder="enter time zone (e.g. GMT+1)" />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}
