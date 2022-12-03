import {React, useEffect, useState} from 'react'
import SelectDropDown from './SelectDropDown';

export default function CountryDropDown(props) {
    const [country , setCountry] = useState([]);
    const [loading , setLoading] = useState(false)
    const [states , setStates] = useState([])
    const [cities , setCities] = useState([])
    const [selectedCountry , setSelectedCountry] = useState("")
    const [selectedState , setSelectedState] = useState("")
    const [selectedCity , setSelectedCity ] = useState("")

    useEffect(() => {
        console.log("use effect")
        fetch('https://restcountries.com/v3.1/all')
       .then(response => response.json())
       .then(response =>  {setCountry(response.map((element) => {
            var str = JSON.parse(JSON.stringify(element.name.common))
            return {value : str , label : str}
                }))})
       .catch(err => console.error(err)); 
        console.log("country " + country) 
    }, [loading]) 


    const handleCountryChange = (countryname) => {
        setSelectedCountry(countryname.value)
        fetch('https://countriesnow.space/api/v0.1/countries/states', {
            method: 'POST', 
            mode: 'cors', 
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ "country" : countryname.value })
        }).then(response => response.json())
        .then(response => {setStates(response.data.states.map((element) => {
            var x = JSON.parse(JSON.stringify(element))
            return {value : element.state_code  , label : element.name}
        }))})
        .catch(err => console.error(err))
    } 

    const handleCityChange = (cityname) => {
        setSelectedCity(cityname)
        props.onDropDownSelect(selectedCountry,selectedState,cityname)
    }

    const handleStateChange = (statename) => {
        setSelectedState(statename)
        fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
            method: 'POST', 
            mode: 'cors', 
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ "country" : selectedCountry , "state" : statename.label })
        }).then(response => response.json())
        .then(response => { setCities(response.data.map((e) => {
            var x = JSON.parse(JSON.stringify(e))
            return {value : e , label : e}
        }))})
        .catch(err => console.error(err))
        props.onDropDownSelect(selectedCountry,statename,selectedCity)
    }

    return (
        <div>
            <SelectDropDown textVal = {"Select Country"} options = {country} onSelectionChange = {(countryname) => {handleCountryChange(countryname)}} />
            <SelectDropDown textVal = {"Select State"} options = {states}  onSelectionChange = {(statename) => {handleStateChange(statename)}} />
            <SelectDropDown textVal = {"Select City"} options = {cities} onSelectionChange = {(cityname) => {handleCityChange(cityname)}} /> 
        </div>
    )
}