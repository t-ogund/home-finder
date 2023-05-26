import React from 'react';

const PropertyMarker = (props) => {
    return(
        <>    
            <div id={`${props.status === 'FOR_SALE' ? 'sale': 'rental'}-property-marker`}>
                <div>
                    {props.hoverStatus === true ? <h6 style={{ zIndex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', border: '1px solid #808080', height: '20px', minWidth: '95px', backgroundColor: '#808080', bottom: '25px', right: '25px', padding: '10px', color: 'white', borderRadius: '10px' }}>${props.price !== undefined && props.price !== null? props.price.toLocaleString('us') : 'TBD'}</h6> : null}
                </div> 
            </div>
            
        </>
    )
}

export default PropertyMarker