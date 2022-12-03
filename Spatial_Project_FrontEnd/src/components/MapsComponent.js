import GoogleMapReact from 'google-map-react'
import MarkerClusterer from '@google/markerclusterer'
import React from 'react'
import GoogleMap from "google-map-react";

const onMapReload = (map, maps) => {

    const locations = [
        { lat: -31.56391, lng: 147.154312 },
        { lat: -33.718234, lng: 150.363181 },
        { lat: -33.727111, lng: 150.371124 },
        { lat: -33.848588, lng: 151.209834 },
        { lat: -33.851702, lng: 151.216968 },
        { lat: -34.671264, lng: 150.863657 },
        { lat: -35.304724, lng: 148.662905 },
        { lat: -36.817685, lng: 175.699196 },
        { lat: -36.828611, lng: 175.790222 },
        { lat: -37.75, lng: 145.116667 },
        { lat: -37.759859, lng: 145.128708 },
        { lat: -37.765015, lng: 145.133858 },
        { lat: -37.770104, lng: 145.143299 },
        { lat: -37.7737, lng: 145.145187 },
        { lat: -37.774785, lng: 145.137978 },
        { lat: -37.819616, lng: 144.968119 },
        { lat: -38.330766, lng: 144.695692 },
        { lat: -39.927193, lng: 175.053218 },
        { lat: -41.330162, lng: 174.865694 },
        { lat: -42.734358, lng: 147.439506 },
        { lat: -42.734358, lng: 147.501315 },
        { lat: -42.735258, lng: 147.438 },
        { lat: -43.999792, lng: 170.463352 },
      ];
      
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Add some markers to the map.
    const markers = locations.map((position, i) => {
        const label = labels[i % labels.length];
        const marker = new window.google.maps.Marker({
        position,
        label,
        });

        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        return marker;
    });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({ markers, map , onClusterClick });
}

function onClusterClick(cluster) {
    
}

const MapsComponent = ({center , zoom}) => {
  return (
    <div className='map'>
        <GoogleMapReact 
        bootstrapURLKeys = {{
            key : 'AIzaSyAPIlPrfd0HQKOIbfK2O6-yKRqfr9r6BtU' }}
            defaultCenter = {center}
            defaultZoom = {zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={(map,maps) => {
                onMapReload(map,maps);
            }}
        />
    </div>
  )
}


MapsComponent.defaultProps = {
    center : {
        lat : 42.3265,
        lng : -122.8756
    },
    zoom: 6
}

export default MapsComponent