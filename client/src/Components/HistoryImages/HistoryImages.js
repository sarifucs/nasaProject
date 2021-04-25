import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { action } from '../../redux/action';
import ImageCard from '../ImageCard/ImageCard';
import { Container, Col, Row, Button } from 'react-bootstrap';
import './HistoryImages.css';

function mapStateToProps(state) {
    return {
        nasaImagesRedux: state.user.nasaImages,
        userReduxId: state.user._id
    }
}
const mapDispatchToProps = (dispatch) => ({
    removeNasaImage: (image) => dispatch(action.removeNasaImage(image))
})
export default connect(mapStateToProps, mapDispatchToProps)(function HistoryImages(props) {
    // const [loading, setLoading] = useState(true)

    const { userReduxId, removeNasaImage, nasaImagesRedux } = props;
    // let images = [...userRedux.nasaImages];
    // async function createHisoryImages() {
    //     const userImages = userRedux.nasaImages;
    //     const listImages = userImages.map(image => {
    //         <li key={image._id}><ImageCard nasaImage={image}></ImageCard></li>
    //     })
    //     return (<ul>{listImages}</ul>);
    //     await console.log(userRedux);
    // }

    async function deleteNasaImage(image) {
        try {
            const obj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userReduxId
                },
                body: JSON.stringify(image)
            };
            const response = await fetch('http://localhost:3400/deleteNasaImageByUserId', obj);
            const data = await response.json();
            console.log(data);
            removeNasaImage(image);
            // setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Container style={{ width: '100%', display: 'inline' }}>
                <hr></hr>
                <Row>
                    <h3 style={{ margin: '0 auto' }}>The pictures that you watched before</h3>
                    {/* {loading ? <div><label>Load pictures...</label></div> : ''} */}
                </Row>
                <Row>
                    {nasaImagesRedux.map((image, index) => (
                        <Col md={2} style={{ display: 'block' }}>
                            {/* <li key={index}> */}
                            <ImageCard nasaImage={image}></ImageCard>
                            <label id="delete"><a onClick={() => deleteNasaImage(image)}>Delete</a></label>
                            {/* <Button onClick={() => deleteNasaImage(image)}>delete</Button> */}
                        </Col>

                        // </li>
                    ))}

                </Row>
            </Container>
            {/* {userReduxId} */}

        </div >
    )
})