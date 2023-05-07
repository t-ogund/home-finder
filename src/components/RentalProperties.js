import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    Form,
    Dropdown,
    DropdownButton,
    Button,
    InputGroup
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import Map from './Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const REACT_APP_ZILLOW_API_KEY = process.env.REACT_APP_ZILLOW_API_KEY;
const REACT_APP_ZILLOW_API_HOST = process.env.REACT_APP_ZILLOW_API_HOST;

const RentalProperties = () => {
// get location query from local storage
const query = localStorage.getItem('input').replace(/['"]+/g, '')
const [ location, setLocation ] = useState(query)
const [ results, setResults ] = useState([]);
const [ rentalPageQuery, setRentalPageQuery ] = useState('');
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


useEffect(() => {
    /* make a GET request to the api, passing in location parameter from local storage
    and useState to set the response to result */

    // set location to value saved in local storage
    setLocation(
        localStorage.getItem('input').replace(/['"]+/g, '')
    )

    location && fetch(`https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=${location}&status_type=ForRent`, options)
        .then(response => response.json())
        .then(response => setResults(response))
        .catch(err => console.error(err));
}, [ location ])

let pending

    /* take response from api call and filter for only properties that are for rent
    filtering out properties where price, lat, or lng are null */

    const propertiesForRent = results.props && results.props.filter(property => {
        if ((property.listingStatus === 'FOR_RENT') && (property.latitude !== null && property.longitude !== null)) {
            return property
        }
    })
    // take properties for rent and for each property create a PropertyCard component
    .map(property => {
        return <Col className='p-1' xl={6} lg={12} md={4} sm={6}>
                    <PropertyCard
                        id={property.zpid}
                        key={property.zpid}
                        price={property.price}
                        beds={property.bedrooms}
                        baths={property.bathrooms}
                        sqft={property.livingArea}
                        address={property.address}
                        status={property.listingStatus}
                        img={property.imgSrc}
                        lat={property.latitude}
                        lng={property.longitude}
                    />
                </Col>
    })

    function handleClickApply() {
        const formattedMin = Number(min.slice(1).replace(',',''))
        let formattedMax
        
        if (max.includes(6)) {
            formattedMax = 999999999
        } else {
            formattedMax = Number(max.slice(1).replace(',',''))
        }

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
                    return (<Col className='p-1' xl={6} lg={12} md={4} sm={6}>
                                <PropertyCard
                                    id={property.zpid}
                                    key={property.zpid}
                                    price={property.price}
                                    beds={property.bedrooms}
                                    baths={property.bathrooms}
                                    sqft={property.livingArea}
                                    address={property.address}
                                    status={property.listingStatus}
                                    img={property.imgSrc}
                                    lat={property.latitude}
                                    lng={property.longitude}
                                />
                            </Col>)
                })
            )
        }
    }

    function handleChange(e) {
        setRentalPageQuery(e.target.value)
    }

    /* when searching for properties from rent page, reset price range filters
     and set the new location to be saved in local storage. New location value 
     will now be called in useEffect function above */
    function handleClick() {
        setPriceRangeProperties(null)
        setLocation(
            localStorage.setItem('input', JSON.stringify(rentalPageQuery))
        )
    }

    function handleClickMin(e) {
        setMin(e.target.textContent)

    }

    function handleClickMax(e) {
        setMax(e.target.textContent)
    }

    return(
        <Container fluid className='h-80'>
            <Row>
                <Col className='sticky-top mt-5 pt-2'>
                    <Row className='form-container'>
                        <Col className='options-container'>
                        <Form className='form-input m-1'>
                            <InputGroup controlId='formBasicEmail'>
                                <Form.Control id='buy-page-searchbox' onChange={handleChange} type='text' placeholder='City, Neighborhood, ZIP, Address' />
                        <Button style={{ border: '1px solid gray', height: '100%', margin: '0' }} id='buy-page-search-button' className='m-1' onClick={handleClick}>
                        <FontAwesomeIcon style={{ color: 'grey', fontSize: '1.2rem' }} icon={faMagnifyingGlass} />
                        </Button>
                            </InputGroup>
                        </Form>
                        <div className='property-dropdowns'>
                            <DropdownButton className='align-filter-dropdowns m-1' id="dropdown-basic-button" title="Change Property Type">
                                <Dropdown.Item href="/sale-properties">
                                    <Link className='property-type-link' to='/rental-properties'>For Sale</Link>
                                </Dropdown.Item>
                            </DropdownButton>
                            <Dropdown className="align-filter-dropdowns mx-2 m-1" autoClose="outside">
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
                                                {<input readOnly defaultValue={min} />}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$0</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$1,000</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$2,000</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$3,000</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={handleClickMin}>$4,000</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown drop={'down-center'} className="d-inline mx-2" autoClose="outside">
                                            <Dropdown.Header>
                                                Maximum
                                            </Dropdown.Header>
                                            <Dropdown.Toggle id="dropdown-autoclose-outside">
                                                {<input readOnly defaultValue={max} />}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={handleClickMax}>$2,000</Dropdown.Item>
                                                <Dropdown.Item onClick={handleClickMax}>$3,000</Dropdown.Item>
                                                <Dropdown.Item onClick={handleClickMax}>$4,000</Dropdown.Item>
                                                <Dropdown.Item onClick={handleClickMax}>$5,000</Dropdown.Item>
                                                <Dropdown.Item onClick={handleClickMax}>$6,000+</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className='apply-button-container'>
                                        <Button className='apply-button' onClick={handleClickApply}>Apply</Button>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                        </Col>    
                    </Row>         
                </Col>
            </Row>
            <Row className='presentation-row h-100'>
                <Col lg={8} xl={7} style={{ marginTop: '100px' }} className='d-none d-lg-block h-100 fixed-top'>
                    {
                        propertiesForRent &&
                        <Map  
                            results={propertiesForRent}
                            priceRangeProperties={priceRangeProperties}
                            lat={Array.isArray(propertiesForRent) ? propertiesForRent[0].props.children.props.lat : null}
                            lng={Array.isArray(propertiesForRent) > 0 ? propertiesForRent[0].props.children.props.lng : null} 
                        /> 
                    }   
                </Col>
                <Col></Col>
                <Col className='property-image-container offset-sm py-5' lg={4} xl={5}>
                    <h3>For Rent in {location}</h3>
                    {
                        <Row>
                            {
                                // propertiesForRent
                                results.props ?
                                priceRangeProperties !== null ? priceRangeProperties : propertiesForRent  
                                :
                                
                                    results.length === 0 ?
                                    pending
                                    :
                                    <div className='pending-container'><h2>No Results...</h2></div>                               
                                
                                // display properties for sale
                            }
                        </Row>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default RentalProperties;