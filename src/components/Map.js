import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import PropertyMarker from './PropertyMarker';

const REACT_APP_API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE;

const Map = ( props ) => {
    // declare latitude and longitude variables from props
    const lat = props.lat;
    const lng = props.lng;

    // define default center of the map using latitude and longitude received from props
    const defaultProps = {
        center: {
            lat: Number(lat),
            lng: Number(lng)
        },
        zoom: 9
    }

// declare state for property markers. default state is the array of propery results
const [ markers, setMarkers ] = useState(props.results.props);
const state = useSelector(state => state)
const hovering = useSelector(state => state.setHoverReducer)

useEffect(() => {
    async function configureMarkers() {
        /* map through property results. For each property result, create a PropertyMarker component
         whose coordinates are the latitude and longitude of each property */
        setMarkers(
            /* if properties were filtered by price, for each property
            create PropertyMarker component whose coordinates are the latitude 
            and longitude of each property */
            props.priceRangeProperties !== null ?
            await props.priceRangeProperties.map((result, index) => {
                console.log('result', result)
                return <PropertyMarker hoverStatus={hovering.index === index} index={index} key={result.props.zpid} lat={result.props.children.props.lat} lng={result.props.children.props.lng} status={result.props.children.props.status} price={result.props.children.props.price} />
            })
            
            :
   
            /* if no price filter and property is FOR_RENT - for each property
            create PropertyMarker component whose coordinates are the latitude 
            and longitude of each property */
            props.results[0] !== undefined && props.results[0].props.children.props.status === 'FOR_RENT' ?
            await props.results.map((result, index) => {
                return <PropertyMarker hoverStatus={hovering.index === index} index={index} key={result.zpid} lat={result.props.children.props.lat} lng={result.props.children.props.lng} status={result.props.children.props.status} price={result.props.children.props.price} />
            })

            :
            /* if no price filter and property is FOR_SALE - for each property
            create PropertyMarker component whose coordinates are the latitude 
            and longitude of each property */
            await props.results.props.map((result, index) => {
                return <PropertyMarker hoverStatus={hovering.index === index} index={index} key={result.zpid} lat={result.latitude} lng={result.longitude} status={result.listingStatus} price={result.price} />
            })
        )
    }

    configureMarkers()

}, [ props.results.props, props.priceRangeProperties, props.results, hovering ])

    return(
        <div style={{ height: '100vh' }} className='map'>
            <GoogleMapReact
            bootstrapURLKeys={{ key: 
                REACT_APP_API_KEY_VALUE }}
                center={defaultProps.center}
                defaultZoom={ defaultProps.zoom }
            >
                { 
                    // render PropertyMarkers on the map
                    markers 
                }
            </GoogleMapReact>
        </div>
    )
}

export default Map;