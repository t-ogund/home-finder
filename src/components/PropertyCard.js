import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch } from 'react-redux';
import { hoverEffect } from '../actions';

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

    function handleMouseEnter(e) {
        if (e.target.tagName === 'DIV') {
            dispatch(hoverEffect(e))
        }
    }

    function handleMouseLeave(e) {
        if (e.target.tagName === 'DIV') {
            dispatch(hoverEffect(e))
        }
    }
   
    let newImages = images.images

    return(
        <>
            <Card className='Card' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleShow} style={{ textAlign: 'left' }}>
                <Card.Img style={{ height: '13rem' }} variant='top' src={props.img} />
                <Card.Body className='p-1' style={{ height: '7rem' }}>
                    <h5 style={{ margin: '0' }}>${props.status === 'FOR_SALE' ? props.price : props.price + '/month'}</h5>
                    <Card.Text>
                        {props.beds}bds | {props.baths}ba | {props.sqft} sqft - House for {props.status === 'FOR_SALE' ? 'sale' : 'rent' } -
                        {props.address}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal style={{ height: '100vh' }} show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Property at {props.address}
                    {props.beds}bds | {props.baths}ba | {props.sqft} sqft - House for {props.status === 'FOR_SALE' ? 'sale' : 'rent' } -
                        {props.address}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel fade>
                        { 
                            newImages && newImages.map(image => {
                                return (
                                    <Carousel.Item className='d-flex justify-content-center'>
                                        <img
                                        className="d-block"
                                        src={image}
                                        alt="First slide"
                                        style={{ maxHeight: '85vh', maxWidth: 'auto' }}
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