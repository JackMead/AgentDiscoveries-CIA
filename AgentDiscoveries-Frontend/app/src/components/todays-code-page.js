import * as React from 'react'
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap'
import { createAPI } from './crud'

export class TodaysCodePage extends React.Component {
  constructor () {
    super()
    this.state = {
      'message': {},
      'result': ''
    }

    this.handleDecode = this.handleDecode.bind(this)
    this.handleEncode = this.handleEncode.bind(this)
  }

  render (props) {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <Form>

          <h3>Encode/decode message with today's secret</h3>

                    <Button className='rm-3' type="submit" onClick={this.handleEncode.bind(this)}>Encode</Button>
                    <Button type="submit" onClick={this.handleDecode.bind(this)}>Decode</Button>
                </Form>

          <Button className='right-margin' type='submit' onClick={this.handleEncode}>Encode</Button>
          <Button type='submit' onClick={this.handleDecode}>Decode</Button>
        </Form>

        <div>
          {this.state.result !== '' ? <h3> Result </h3> : ''}
          {this.state.result}
        </div>
      </div>

    )
  }

  handleEncode (e) {
    e.preventDefault()
    this.handleRequest('v1/api/encodemessage')
  }

    handleRequest(api) {
        const requestJSON = { "message": this.state.message.message.value }
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
