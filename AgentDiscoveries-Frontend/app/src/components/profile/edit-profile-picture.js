import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { updatePicture } from '../crud';
import Message from '../message';

export default class EditProfilePicture extends React.Component {
  constructor () {
    super();
    this.state = {
      message: { message: '', type: 'danger' }
    };
    this.file = null;

    this.handleClick = this.handleClick.bind(this);
    this.handlePictureUpdate = this.handlePictureUpdate.bind(this);
  }

  render () {
    return (
      <div className='overlay-action' onClick={this.handleClick}>
        <Message message={this.state.message} />
        <p> Change Profile Picture </p>
        <Form encType='multipart/form-data'>
          <FormGroup hidden>
            <FormControl id='selectFile'
              accept='image/png, image/jpeg'
              type='file'
              name='file'
              inputRef={file => { this.file = file }}
              onChange={this.handlePictureUpdate} />
          </FormGroup>
        </Form>
      </div>
    );
  }

  handleClick (e) {
    document.getElementById('selectFile').click();
  }

  handlePictureUpdate (e) {
    e.preventDefault();
    if (!this.isPictureValid(this.file)) {
      return;
    }

    const userId = window.localStorage.getItem('UserId');
    let formData = new FormData();
    formData.append('file', this.file.files[0]);

    updatePicture('/v1/api/pictures', userId, formData)
      .then(response => {
        if (response.ok) {
          response.json();
        } else {
          throw Error('Image could not be uploaded');
        }
      })
      .then(() => {
        this.setState({
          image: this.file.value
        });
      })
      .catch(error => {
        this.setState({
          message: { message: error.message, type: 'warning' }
        });
      });
  }

  isPictureValid (file) {
    if (!file) {
      this.setState(
        { message: { message: 'Select a file before submission', type: 'warning' } }
      );
      return false;
    } else if (this.file.size > 1024 * 1024) {
      this.setState(
        { message: { message: 'File must be less than 1MB', type: 'warning' } }
      );
      return false;
    }
    return true;
  }
};
