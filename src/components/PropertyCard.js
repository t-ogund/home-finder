import React from 'react';
import { Card } from 'react-bootstrap';

const PropertyCard = (props) => {
    return(
        // <div className='bg-info' style={{ display: 'inline-block', margin: '5px', padding: 0 }}>
        <Card style={{ textAlign: 'left' }}>
            <Card.Img style={{ height: '13rem' }} variant='top' src={props.img} />
            <Card.Body style={{ height: '7rem' }}>
                <h5>${props.price}</h5>
                <Card.Text>
                    {props.beds}bds | {props.baths}ba | {props.sqft} sqft - House for {props.status === 'FOR_SALE' ? 'sale' : 'rent' } <br></br>
                    {props.address}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PropertyCard;