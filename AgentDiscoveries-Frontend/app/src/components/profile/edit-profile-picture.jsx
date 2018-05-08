import * as React from 'react';
import {Form, FormControl, FormGroup} from 'react-bootstrap';
import {getTokenHeader} from '../utilities/request-helper';
import Message from '../message';
import {currentUserId} from '../utilities/user-helper';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export default class EditProfilePicture extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            file: '',
            message: {}
        };

        this.onClick = this.onClick.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    render () {
        return (
            <React.Fragment>
                <div className='overlay'>
                    <div className='overlay-action' onClick={this.onClick}>
                        <p> Change Profile Picture </p>
                        <Form encType='multipart/form-data'>
                            <FormGroup hidden>
                                <FormControl id='selectFile'
                                    accept='image/png, image/jpeg'
                                    type='file'
                                    name='file'
                                    value={this.state.file}
                                    onChange={this.onUpdate} />
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <Message message={this.state.message} />
            </React.Fragment>
        );
    }

    onClick() {
        // The best way of triggering the file dialog programmatically is to simulate a 'click'
        document.getElementById('selectFile').click();
    }

    onUpdate(event) {
        event.preventDefault();

        const file = event.target.files[0];

        if (!this.validatePicture(file)) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        // Not JSON, so don't use the API request helpers
        fetch('v1/api/pictures/' + currentUserId(), {
            method: 'PUT',
            headers: { 'Authorization': getTokenHeader() },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw Error('Image could not be uploaded');
                }
            })
            .then(() => {
                this.props.onSuccess();
            })
            .catch(error => {
                this.setState({
                    message: { message: error.message, type: 'warning' }
                });
            });
    }

    validatePicture(file) {
        if (!file) {
            this.setState({ message: { message: 'Select a file before submission', type: 'warning' } });
            return false;
        } else if (file.size > MAX_FILE_SIZE) {
            this.setState({ message: { message: 'File must be less than 1MB', type: 'warning' } });
            return false;
        }
        return true;
    }
}
