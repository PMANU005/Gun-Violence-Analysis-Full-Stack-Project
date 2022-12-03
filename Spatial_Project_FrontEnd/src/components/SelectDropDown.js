import React from 'react'
import Select from 'react-select'

function SelectDropDown(props) {
  return (
    <div>
        <label> {props.textVal} </label>
        <Select options={props.options} onChange={(value) => {props.onSelectionChange(value)}}>
        </Select>
    </div>
  )
}

export default SelectDropDown
