import {Box , TextField } from '@mui/material'
import { useState, Fragment } from 'react'
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

export const DatePicker = (props) => {
    const [value , setValue] = useState([null,null])

    const onDateChange = (newValue) => {
            setValue(newValue)
           props.onDateSelected(newValue)
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> 
        <DateRangePicker 
            startText= 'start date' 
            endText= 'end date' 
            value={value} 
            onChange={onDateChange} 
            renderInput = { (startProps , endProps)  => (
                <Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                </Fragment>    
            )}
        /> 
    </LocalizationProvider>
  )
}
