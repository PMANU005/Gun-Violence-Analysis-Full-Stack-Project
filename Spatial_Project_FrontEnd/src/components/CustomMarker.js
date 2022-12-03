import React from 'react'
import {MarkerF} from "@react-google-maps/api";

const CustomMarker = (props) => {
  return (
     <MarkerF position={props.position} clusterer={props.clusterer} />
  )
}

export default CustomMarker