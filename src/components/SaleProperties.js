import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    Form, 
} from 'react-bootstrap';
import PropertyCard from './PropertyCard';

const SaleProperties = () => {
const [ results, setResults ] = useState([]);

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REACT_APP_API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE;
const REACT_APP_ZILLOW_API_KEY = process.env.REACT_APP_ZILLOW_API_KEY;
const REACT_APP_ZILLOW_API_HOST = process.env.REACT_APP_ZILLOW_API_HOST;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': REACT_APP_ZILLOW_API_KEY,
		'X-RapidAPI-Host': REACT_APP_ZILLOW_API_HOST
	}
};

const location = localStorage.getItem('input').replace(/['"]+/g, '')

useEffect(() => {
    fetch(`https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=${location}`, options)
	.then(response => response.json())
	.then(response => setResults(response))
	.catch(err => console.error(err));
}, [])

    const propertiesForSale = results.props && results.props.filter(property => {
        if (property.listingStatus === 'FOR_SALE') {
            return property
        }
    })
    .map(property => {
        return <PropertyCard
            key={property.zpid}
            price={property.price}
            beds={property.bedrooms}
            baths={property.bathroom}
            sqft={property.lotAreaValue}
            address={property.address}
            status={property.listingStatus}
            img={property.imgSrc}
        />
    })
    return(
        <Container fluid className="h-80">
            <Row>
                <Col className='fixed-top mt-5 p-0'>
                    <div className='form-container'>
                        <Form className='form-input'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="City, Neighborhood, ZIP, Address" />
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Row className='h-100'>
                <Col lg={8} xl={7} style={{ marginTop: '100px' }} className='d-none d-lg-block h-100 fixed-top'>
                    <iframe
                        width="100%"
                        height="100%"
                        loading="lazy"
                        allowfullscreen
                        src={`${REACT_APP_API_BASE_URL}key=${REACT_APP_API_KEY_VALUE}
                        &q=${location}`}>
                    </iframe>
                </Col>
                <Col></Col>
                <Col className="offset-2 offset-sm-6 py-2" style={{ padding: '0', margin: 0 }} lg={4} xl={5}>
                    <h3>Real Estate & Homes for Sale</h3>
                    { propertiesForSale }
                </Col>
            </Row>
        </Container>
    )
}

export default SaleProperties;