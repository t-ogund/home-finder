import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

const REACT_APP_ZILLOW_API_KEY = process.env.REACT_APP_ZILLOW_API_KEY;
const REACT_APP_ZILLOW_API_HOST = process.env.REACT_APP_ZILLOW_API_HOST;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': REACT_APP_ZILLOW_API_KEY,
		'X-RapidAPI-Host': REACT_APP_ZILLOW_API_HOST
	}
};

const PropertyCard = (props) => {

    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [ images, setImages ] = useState([]);

    const dispatch = useDispatch();

    function handleShow() {
        setShow(true);

        fetch(`https://zillow-com1.p.rapidapi.com/images?zpid=${props.id}`, options)
            .then(response => response.json())
            .then(response => setImages(response))
            .catch(err => console.error(err));
      }
   
    let newImages = images.images

        let propertyType
        if (props) {
            switch (props.propertyType) {
                case 'SINGLE_FAMILY':
                    propertyType = 'House'
                    break;
                case 'CONDO':
                    propertyType = 'Condo'
                    break;
                case 'TOWNHOUSE':
                    propertyType = 'Townhouse'
                    break;
                case 'APARTMENT':
                    propertyType = 'Apartment'
                    break;
                default:
                    propertyType = 'Property'
            }
        }
  
    return(
        <>
            <Card className='Card' onMouseEnter={props.hoverEffect} onClick={handleShow} style={{ textAlign: 'left' }}>
                <Card.Img style={{ height: '13rem', objectFit: 'none' }} variant='top' src={props.img} />
                <Card.Body className='p-1' style={{ height: '7rem' }}>
                    <h5 style={{ margin: '0' }}>${props.status === 'FOR_SALE' ? props.price === undefined ? 'TBD' : props.price.toLocaleString('en') : props.price === undefined ? 'TBD' : props.price.toLocaleString('en') + '/month'}</h5>
                    <Card.Text>
                        {props.beds}bds | {props.baths}ba | {props.sqft} sqft - {propertyType} for {props.status === 'FOR_SALE' ? 'sale' : 'rent' } | {props.address}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title><h6>Property at {props.address} | {props.beds}bds | {props.baths}ba | {props.sqft} sqft - {propertyType} for {props.status === 'FOR_SALE' ? 'sale' : 'rent' } - {props.address}</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel fade>
                        { 
                            newImages === undefined ?
                            <div className='loading-spinner'>
                                <h3>Hold tight...</h3>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                            :
                            newImages && newImages.map(image => {
                                return (
                                    <Carousel.Item key={image} className='d-flex justify-content-center'>
                                        <img
                                        className="d-block"
                                        src={image}
                                        alt="First slide"
                                        style={{ maxHeight: '85vh', width: '100%', objectFit: 'none' }}
                                        />
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PropertyCard;