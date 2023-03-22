import React from 'react';
import { Card } from 'react-bootstrap';

const PropertyCard = () => {
    return(
        <div style={{ display: 'inline-block', margin: '5px', padding: 0, backgroundColor: 'green' }}>
            <Card style={{ height: '20rem', width: '20rem', textAlign: 'left' }}>
                <Card.Img variant="top" src="house-placeholder.jpg" />
                <Card.Body>
                    <h5>$274,000</h5>
                    <Card.Text>
                        3 bds | 2ba | 2181 sqft - House for sale
                        302 Park Ave, Rowley IA 52329
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PropertyCard;