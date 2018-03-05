import * as React from 'react';
import {
  Image,
  Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { readAPI } from '../crud';
import { getEntity } from '../utilities/get-utilities';
import AgentInfo from './agent-info';
import EditProfilePicture from './edit-profile-picture';

export default class Profile extends React.Component {
  constructor () {
    super();
    this.state = {
      imgSrc: 'http://clipground.com/images/placeholder-clipart-5.jpg',
      user: {},
      agent: {}
    };

    this.getProfilePictureSource = this.getProfilePictureSource.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getAgent = this.getAgent.bind(this);
  }

  componentWillMount () {
    this.getProfilePictureSource();
    this.getUser();
    this.getAgent();
  }

  componentWillReceiveProps () {
    this.getProfilePictureSource();
  }

  render () {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <h3>{this.state.user ? `Welcome ${this.state.user.username}` : '' }</h3>

        <div className='col-md-6'>
          {this.state.agent ? <AgentInfo agent={this.state.agent} /> : ''}
          <Link to='/profile/edit/callsign'>
            <Button type='button'>
              Change Call Sign
            </Button>
          </Link>
        </div>

        <div className='profile-img-container col-md-6'>
          <Image className='img' src={this.state.imgSrc} />
          <div className='overlay'>
            <EditProfilePicture />
          </div>
        </div>

      </div>
    );
  }

  getProfilePictureSource () {
    const userId = window.localStorage.getItem('UserId');
    readAPI('/v1/api/pictures', userId)
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else {
          throw Error('Could not retrieve picture from the API server');
        }
      })
      .then(blob => {
        this.setState({imgSrc: URL.createObjectURL(blob)});
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUser () {
    const userId = window.localStorage.getItem('UserId');
    getEntity('users', userId)
      .then(response => {
        this.setState({
          user: response
        });
        this.getAgent();
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAgent () {
    const userId = window.localStorage.getItem('UserId');
    getEntity('agents', userId)
      .then(response => {
        this.setState({
          agent: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
