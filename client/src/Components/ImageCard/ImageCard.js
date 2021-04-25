import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Modal, Button, Card } from 'react-bootstrap';
import './ImageCard.css';

export default function ImageCard(props) {
    const [show, setShow] = useState(false);
    const { nasaImage } = props;

    return (
        <div>
            {/* <h1>{nasaImage}</h1> */}
            <Card>
                <Card.Body>
                    <div><h6 id="title">{nasaImage.title}</h6></div>
                    <div id="todayImage">
                        {nasaImage.media_type == 'image' ?
                            <img src={nasaImage.url}></img> :
                            <ReactPlayer style={{ margin: '0 auto' }} url={nasaImage.url}></ReactPlayer>}
                    </div>
                    {/* <button>View delails</button>
            <p>{nasaImage.explanation}</p> */}

                    <Button variant="primary" onClick={() => setShow(true)} style={{ width: '60px', margin: '3px auto' }}>Details</Button>
                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                {nasaImage.title}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{nasaImage.explanation}</p>
                        </Modal.Body>
                    </Modal>
                </Card.Body>
            </Card>
        </div>
    )
}