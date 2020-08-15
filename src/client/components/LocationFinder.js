import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Loader from 'react-loader';
import { useState } from 'react'

export default function LocationFinder() {
  const [location, setLoaction] = useState('')
  const [polygonRegion, setPolygonRegion] = useState('')
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState('')

  function onType (e) {
    setLoaction(e.target.value)
  }

  function callEndPoint(e) {
    setLoader(false)
    setPolygonRegion('')
    setError('')
    e.preventDefault()
    axios.post('/api/outlet/location', {
      location: location
    })
      .then((response) => {
        setPolygonRegion(response.data.location)
        setLoader(true)
      })
      .catch((error) => {
        setLoader(true)
        console.log(error)
        setError(error.message)
      });
  }


  return (
    <Loader loaded={loader}>
      <div className="container">
        <h1>Delivery Region Finder </h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Enter the location" onChange={(e) => onType(e)} value={location} />
            <Form.Text className="text-muted">
              Please Enter the Location  for which you wish to find the circle
    				</Form.Text>
          </Form.Group>
          <Button disabled={!location} variant="primary" type="submit" onClick={(e) => callEndPoint(e)}>
            Submit
  				</Button>
        </Form>

       {polygonRegion ? <div className="polygon-output">Delivery Region - {polygonRegion ? polygonRegion : ''}</div> : ""}
       {error ? <div className="polygon-output">ErrorMessage - {error ? error : ''}</div> : ''}

      </div>
    </Loader>
  );
}
