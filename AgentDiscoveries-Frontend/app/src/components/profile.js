import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button
} from "react-bootstrap";
import {updateAPI, updatePicture, readAPI} from "./crud";

export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            file: null,
            imgSrc: ""
        }
        this.onChange = this.onChange.bind(this)
        this.handlePictureUpdate = this.handlePictureUpdate.bind(this)
    }

    render() {
        if (!this.isUserLoggedIn()) {
            return null;
        }
        this.getProfileSrc();
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
                <img src={this.state.imgSrc} onError={(e)=>{e.target.src='/userResources/default.jpg'}}/>
                <Form encType="multipart/form-data" onSubmit={this.handlePictureUpdate.bind(this)}>
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
        var userId = window.localStorage.getItem("UserId");
        const formData = new FormData();
        formData.append('file', this.state.file);

        updatePicture("/v1/api/images", userId, formData)
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
        readAPI("/v1/api/images", userId).then(response => response.json())
            .then(response => {
                let binaryData = response.imageBytes;
                let fileType = response.fileType;
                let base64String = btoa(String.fromCharCode(...new Uint8Array(binaryData)));
                this.state.imgSrc = "data:image/"+fileType+";base64,"+base64String;
            })
    }

    isUserLoggedIn() {
        let token = window.localStorage.getItem("Token");
        return !!token;
    }
};
