import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import { createAPI } from "./crud"

export class TodaysCodePage extends React.Component {

    constructor() {
        super();
        this.state = {
            "message": {},
            "result": ""
        }
    }

    render(props) {
        return (
            <div className="col-md-8">
                <Form>

                    <h3>Encode/decode message with today's secret</h3>

                    <FormGroup>
                        <ControlLabel>Message</ControlLabel>
                        <FormControl type="text" required
                            inputRef={message => this.state.message.message = message}
                            placeholder="enter message" />
                    </FormGroup>

                    <Button type="submit" onClick={this.handleEncode.bind(this)}>Encode</Button>
                    <Button type="submit" onClick={this.handleDecode.bind(this)}>Decode</Button>
                </Form>

                <div>
                {this.state.result != "" ? <h3> Result </h3> : ""}
                    {this.state.result}
                </div>
            </div>

            
        );
    }

    handleEncode(e) {
        e.preventDefault();
        this.handleRequest("v1/api/encodemessage");
    }

    handleDecode(e) {
        e.preventDefault();
        this.handleRequest("v1/api/decodemessage");
    }

    handleRequest(api) {
        var requestJSON = { "message": this.state.message.message.value }
        createAPI(api, JSON.stringify(requestJSON))
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw ("Server cannot process the request")
                }
            })
            .then(response => this.setState({ "result": response.message }))
            .catch(error => this.setState({ "result": error }))
    }
}
