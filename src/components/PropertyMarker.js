import React from 'react';

const PropertyMarker = (props) => {
    return(
        <div id={`${props.status === 'FOR_SALE' ? 'sale': 'rental'}-property-marker`}>

        </div>
    )
}

export default PropertyMarker