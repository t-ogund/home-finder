import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    Form, 
} from 'react-bootstrap';
import PropertyCard from './PropertyCard';
import Map from './Map';

const REACT_APP_ZILLOW_API_KEY = process.env.REACT_APP_ZILLOW_API_KEY;
const REACT_APP_ZILLOW_API_HOST = process.env.REACT_APP_ZILLOW_API_HOST;

const SaleProperties = () => {
const [ results, setResults ] = useState([]);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': REACT_APP_ZILLOW_API_KEY,
		'X-RapidAPI-Host': REACT_APP_ZILLOW_API_HOST
	}
};

// get location query from local storage
const location = localStorage.getItem('input').replace(/['"]+/g, '')

useEffect(() => {
    /* make a GET request to the api, passing in location parameter from local storage
    and useState to set the response to result */
    fetch(`https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=${location}`, options)
        .then(response => response.json())
        .then(response => setResults(response))
        .catch(err => console.error(err));
}, [])

    // take response from api call and filter for only properties that are for sale
    const propertiesForSale = results.props && results.props.filter(property => {
        if (property.listingStatus === 'FOR_SALE') {
            return property
        }
    })
    // take properties for sale and for each property create a PropertyCard component
    .map(property => {
        return <PropertyCard
            key={property.zpid}
            price={property.price}
            beds={property.bedrooms}
            baths={property.bathrooms}
            sqft={property.lotAreaValue}
            address={property.address}
            status={property.listingStatus}
            img={property.imgSrc}
            lat={property.latitude}
            lng={property.longitude}
        />
    })
    return(
        <Container fluid className='h-80'>
            <Row>
                <Col className='fixed-top mt-5 p-0'>
                    <div className='form-container'>
                        <Form className='form-input'>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Control type='text' placeholder='City, Neighborhood, ZIP, Address' />
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Row className='h-100'>
                <Col lg={8} xl={7} style={{ marginTop: '100px' }} className='d-none d-lg-block h-100 fixed-top'>
                    {
                        results &&
                        <Map  
                    results={results}
                    lat={!Array.isArray(results) ? results.props[0].latitude : null}
                    lng={!Array.isArray(results) > 0 ? results.props[0].longitude : null}/> 
                    }   
                </Col>
                <Col></Col>
                <Col className='offset-2 offset-sm-6 py-2' style={{ padding: '0', margin: 0 }} lg={4} xl={5}>
                    <h3>Real Estate & Homes for Sale</h3>
                    {
                        // display properties for sale
                        propertiesForSale 
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default SaleProperties;