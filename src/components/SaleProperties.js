import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    Form,
    Dropdown,
    DropdownButton,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import Map from './Map';

const REACT_APP_ZILLOW_API_KEY = process.env.REACT_APP_ZILLOW_API_KEY;
const REACT_APP_ZILLOW_API_HOST = process.env.REACT_APP_ZILLOW_API_HOST;

const SaleProperties = () => {
const [ results, setResults ] = useState([]);
const [ min, setMin ] = useState(null);
const [ max, setMax ] = useState(null);
const [ priceRangeProperties, setPriceRangeProperties ] = useState(null);
const [ priceFilterWarning, setPriceFilterWarning ] = useState('');

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

    function handleClickMin(e) {
        setMin(e.target.textContent)

    }

    function handleClickMax(e) {
        setMax(e.target.textContent)
    }

    function handleClickApply() {
        const formattedMin = Number(min.slice(1).replace(',',''))
        const formattedMax = Number(max.slice(1).replace(',',''))
        if (formattedMin > formattedMax) {
            setPriceFilterWarning(
                'Minimum cannot be greater than maximum'
            )
        } else if (formattedMin === formattedMax) {
            setPriceFilterWarning(
                'Minimum and maximum cannot be the same value'
            )
        } else {
            setPriceFilterWarning('');
            /* if no price filter warnings, filter properties and
            for each property that meets filter condition, create a PropertyCard component */
            setPriceRangeProperties(
                results.props.filter(property => {
                    if ((property.price >= formattedMin) && (property.price < formattedMax)) {
                        return property
                    }
                }
                    
                )
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
            )
        }
    }

    return(
        <Container fluid className='h-80'>
            <Row>
                <Col className='fixed-top mt-5 p-0'>
                    <Row className='form-container'>
                        <Col>
                        <Form className='form-input'>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Control type='text' placeholder='City, Neighborhood, ZIP, Address' />
                            </Form.Group>
                        </Form>
                            <DropdownButton className='align-filter-dropdowns' id="dropdown-basic-button" title="Change Property Type">
                                <Dropdown.Item href="#/action-1">
                                    <Link className='property-type-link' to='/rental-properties'>Rentals</Link>
                                </Dropdown.Item>
                            </DropdownButton>
                            <Dropdown className="d-inline mx-2" autoClose="outside">
                                <Dropdown.Toggle id="dropdown-autoclose-outside">
                                    Set Price Range
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Price Range</Dropdown.Header>
                                    <Dropdown.Divider />
                                    <div id='filter-warning-container'>
                                        <span id='price-filter-warning'>{ priceFilterWarning }</span>
                                    </div>
                                    <div className='price-filter-dropdown-container'>
                                        <Dropdown drop={'down-center'} className="d-inline mx-2" autoClose="outside">
                                            <Dropdown.Header>
                                                Minimum
                                            </Dropdown.Header>
                                            <Dropdown.Toggle id="dropdown-autoclose-outside">
                                                {<input defaultValue={min} />}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$0</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$100,000</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$200,000</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$300,000</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$400,000</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown drop={'down-center'} className="d-inline mx-2" autoClose="outside">
                                            <Dropdown.Header>
                                                Maximum
                                            </Dropdown.Header>
                                            <Dropdown.Toggle id="dropdown-autoclose-outside">
                                                {<input defaultValue={max} />}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={handleClickMax}>$200,000</Dropdown.Item>
                                                <Dropdown.Item onClick={handleClickMax}>$300,000</Dropdown.Item>
                                                <Dropdown.Item onClick={handleClickMax}>$400,000</Dropdown.Item>
                                                <Dropdown.Item onClick={handleClickMax}>$500,000</Dropdown.Item>
                                                <Dropdown.Item onClick={handleClickMax}>$600,000+</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className='apply-button-container'>
                                        <Button className='apply-button' onClick={handleClickApply}>Apply</Button>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>    
                    </Row>         
                </Col>
            </Row>
            <Row className='presentation-row h-100'>
                <Col lg={8} xl={7} style={{ marginTop: '100px' }} className='d-none d-lg-block h-100 fixed-top'>
                    {
                        results &&
                        <Map  
                            results={results}
                            priceRangeProperties={priceRangeProperties}
                            lat={!Array.isArray(results) ? results.props[0].latitude : null}
                            lng={!Array.isArray(results) > 0 ? results.props[0].longitude : null} 
                        /> 
                    }   
                </Col>
                <Col></Col>
                <Col className='property-image-container offset-2 offset-sm-6 py-2' lg={4} xl={5}>
                    <h3>Real Estate & Homes for Sale</h3>
                    {
                        // display properties for sale
                        priceRangeProperties !== null ? priceRangeProperties : propertiesForSale 
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default SaleProperties;