import React from 'react';
import { Card } from 'react-bootstrap';

const PropertyCard = (props) => {
    return(
        <div style={{ display: 'inline-block', margin: '5px', padding: 0 }}>
            <Card style={{ height: '22rem', width: '20rem', textAlign: 'left' }}>
                <Card.Img variant="top" src={props.img} />
                <Card.Body>
                    <h5>${props.price}</h5>
                    <Card.Text>
                        {props.beds}bds | {props.baths}ba | {props.sqft} sqft - House for {props.status === 'FOR_SALE' ? 'sale' : 'rent' } <br></br>
                        {props.address}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PropertyCard;