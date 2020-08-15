import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Loader from 'react-loader';

export default class LocationFinder extends Component {

  state = { location: '', polygonRegion: '', loader: true };
  onType = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  callEndPoint(e) {
		this.setState({
				loader: false
		})
    e.preventDefault()
    axios.post('/api/outlet/location', {
      location: this.state.location
    })
      .then((response) => {

        console.log(response)
        this.setState({
          polygonRegion: response.data.location,
          loader: true
        })
      })
      .catch( (error) => {
          this.setState({loader: true})
        console.log(error);
      });
  }

  render() {
    const { location } = this.state;
    return (
        <Loader loaded={this.state.loader}>
      <div className="container">
        <h1>Polygon Finder </h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Enter the location" onChange={this.onType.bind(this)} value={this.state.location} />
            <Form.Text className="text-muted">
              Please Enter the Location  for which you wish to find the circle
    				</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.callEndPoint.bind(this)}>
            Submit
  				</Button>
        </Form>
        {this.state.polygonRegion ? this.state.polygonRegion : ''}
      </div>
      </Loader>
    );
  }
}
