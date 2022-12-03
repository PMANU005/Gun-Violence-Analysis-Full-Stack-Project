import React , {useEffect} from "react";

import {
  GoogleMap,
  GoogleMapProps,
  useLoadScript
} from "@react-google-maps/api";

const defaultCenter = { lat: 28.612734, lng: 77.231178 };

const options = {
  disableDefaultUI: true,
  scaleControl: true,
  mapTypeId: "roadmap",
  labels: true
};


export default function Map(props) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPIlPrfd0HQKOIbfK2O6-yKRqfr9r6BtU"
  });

  const renderMap = () => {
    
    const loadHandler = (map) => {
      props.setMap(map);
    };

    return (
        <div className='map'>
            <GoogleMap
                id="circle-example"
                zoom={6}
                center={defaultCenter}
                options={options}
                onLoad={loadHandler}
            >
                {props.children}
            </GoogleMap>
        </div>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div>Loading...</div>;
}
