import React from 'react';
import { Card } from 'react-bootstrap';

const PropertyCard = (props) => {
    console.log('props', props)
    const handleHover = () => {
        console.log('hovered')
    }

    return(
        <div onMouseEnter={handleHover}>
            <Card style={{ textAlign: 'left' }}>
                <Card.Img style={{ height: '13rem' }} variant='top' src={props.img} />
                <Card.Body className='p-1' style={{ height: '7rem' }}>
                    <h5 style={{ margin: '0' }}>${props.status === 'FOR_SALE' ? props.price : props.price + '/month'}</h5>
                    <Card.Text>
                        {props.beds}bds | {props.baths}ba | {props.sqft} sqft - House for {props.status === 'FOR_SALE' ? 'sale' : 'rent' }
                        {props.address}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PropertyCard;