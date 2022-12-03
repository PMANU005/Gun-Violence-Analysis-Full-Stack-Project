import  { React, useState } from 'react'
import { DatePicker } from './DatePicker'
import CountryDropDown from './CountryDropDown.js';
import MapMarkerComponent from './MapMarkerComponent';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

// Main componennt which renders other components

const MainComponent = () => {
  
  const [startdate , setStartDate] = useState(null)
  const [enddate , setEndDate] = useState(null)  
  const [country , setCountry] = useState(null)  
  const [state , setState] = useState(null)  
  const [city , setCity] = useState(null)
  const [latlang , setlatlang]  = useState([])

    const allValues = (countryValue, stateValue , cityValue) => {
        setCountry(countryValue)
        setState(stateValue)
        setCity(cityValue.value)
    }

    const setDate = (dateValue) => {
        var month1 = dateValue[0].$M + 1
        var month2 = dateValue[1].$M + 1
        var sdate =  dateValue[0].$y + "-" + (month1 < 10 ? ("0"+month1) : month1) + "-" + ( dateValue[0].$D < 10 ? ("0" + dateValue[0].$D) : dateValue[0].$D)
        var edate =  dateValue[1].$y + "-" + (month2 < 10 ? ("0"+month2) : month2) + "-" + ( dateValue[1].$D < 10 ? ("0" + dateValue[1].$D) : dateValue[1].$D)
        
        setStartDate(sdate)
        setEndDate(edate)
    }

    const getLatLangPoints = (event) => {
        event.preventDefault()
        console.log("form submitted")
    }

    
    const getDataFromLocalHost = () => {
        const URL = 'http://localhost:9191/incidents'
        console.log({ 
            "state" :  state.value,
            "city" : city ,
            "orginalState" : state.label,
            "startDate" : startdate,
           "endDate" : enddate
       })
        fetch(URL , {
            method: 'POST', 
            mode: 'cors', 
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ 
                "state" :  state.value,
                "city" : city,
                "orginalState" : state.label,
                "startDate" : startdate,
                "endDate" : enddate
            })
        })
       .then(response => response.json())
       .then(response => { console.log(response); setlatlang(response) } )
       .catch(err => console.error(err)); 
           
    }

    return (
        <div>
            <div className="row">
            <div className="col-lg-3">
        <h1> Welcome to Spatial </h1>
        <form onSubmit = {getLatLangPoints}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label >Select Dates</Form.Label>
                <DatePicker onDateSelected={setDate} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    <CountryDropDown onDropDownSelect = {allValues} />
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick = {getDataFromLocalHost}>
                Submit
            </Button>
        </form>
        </div>
            <div className="col-lg-9">
                <MapMarkerComponent locations = {latlang} />
            </div>
        </div>
        </div>
    )
}

export default MainComponent