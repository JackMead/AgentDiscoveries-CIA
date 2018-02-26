import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import {updateAPI, updatePicture, readAPI} from "./crud";

export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            file: null,
            imgSrc: "",
            imageUploadMessage: ""
        }
        this.onChange = this.onChange.bind(this)
        this.handlePictureUpdate = this.handlePictureUpdate.bind(this)
    }

    componentDidMount() {
        this.getProfileSrc();
    }

    render() {
        if (!this.isUserLoggedIn()) {
            return null;
        }
        return (
            <div>
                <Form onSubmit={this.handleAgentUpdate.bind(this)}>
                    <h3>Update Profile</h3>
                    <FormGroup>
                        <FormControl type="text" inputRef={callSign => this.callSign = callSign}
                                     placeholder="enter your call sign"/>
                        <Button type="submit">Submit Changes</Button>
                    </FormGroup>
                </Form>
                <img src={this.state.imgSrc} onError={(e) => {
                    e.target.src = '/userResources/default.jpg'
                }}/>
                <Form encType="multipart/form-data" onSubmit={this.handlePictureUpdate.bind(this)}>
                    <ControlLabel bsStyle="warning">{this.state.imageUploadMessage}</ControlLabel>
                    <FormGroup>
                        <FormControl accept="image/png, image/jpeg" type="file" name="file" onChange={this.onChange}/>
                        <Button type="submit">Update Picture</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    onChange(e) {
        this.state.file = e.target.files[0];
    }

    handlePictureUpdate(e) {
        e.preventDefault();
        if (this.state.file.size > 1024 * 1024) {
            this.setState({imageUploadMessage: "File must be less than 1MB"});
            return
        }
        this.setState({imageUploadMessage: ""});

        var userId = window.localStorage.getItem("UserId");
        const formData = new FormData();
        formData.append('file', this.state.file);

        updatePicture("/v1/api/pictures", userId, formData)
            .then(this.getProfileSrc());
    }

    handleAgentUpdate(e) {
        e.preventDefault();
        var userId = window.localStorage.getItem("UserId");
        var requestBodyJSON = {
            "callSign": this.callSign.value
        }
        updateAPI("/v1/api/agents", userId, JSON.stringify(requestBodyJSON));
    }

    getProfileSrc() {
        var userId = window.localStorage.getItem("UserId");
        readAPI("/v1/api/pictures", userId)
            .then(response => response.blob())
            .then(blob => {
                this.setState({imgSrc: URL.createObjectURL(blob)});
            })

    }

    isUserLoggedIn() {
        const token = window.localStorage.getItem("Token");
        return !!token;
    }
};
