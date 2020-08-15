import React, { Component } from 'react';
import './app.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import LocationFinder from './components/LocationFinder'
export default class App extends Component {

  render() {
    return (
      <LocationFinder/>
    )
  }
}
