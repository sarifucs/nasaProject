import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { connect } from 'react-redux';
import { action } from '../../redux/action';
import './SelectedImages.css'
import { Container, Row, Col, Card } from 'react-bootstrap';

function mapStateToProps(state) {
    return {
        nasaImageRedux: state.user.nasaImage,
        userRedux: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    setNasaImage: (image) => dispatch(action.setNasaImage(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(function SelectedImages(props) {

    const [loading, setLoading] = useState(true)
    const [allNasaImages, setAllNasaImages] = useState([]);
    // {
    //     date: "2013-12-27",
    //     explanation: "Cosmic clouds seem to form fantastic shapes in the central regions of emission nebula IC 1805. Of course, the clouds are sculpted by stellar winds and radiation from massive hot stars in the nebula's newborn star cluster, Melotte 15. About 1.5 million years young, the cluster stars are near the center of this colorful skyscape, along with dark dust clouds in silhouette. Dominated by emission from atomic hydrogen, the telescopic view spans about 30 light-years. But wider field images reveal that IC 1805's simpler, overall outline suggests its popular name - The Heart Nebula. IC 1805 is located along the northern Milky Way, about 7,500 light years distant toward the constellation Cassiopeia.",
    //     media_type: "image",
    //     title: "Melotte 15 in the Heart",
    //     url: "https://apod.nasa.gov/apod/image/1312/LRGBV6Melotte15_JWalker900.jpg"
    // }
    let { userRedux, setNasaImage } = props;
    // let arr = [];
    // let i = 0;
    // console.log(data);
    // console.log(data.pictures);
    // data.pictures.collection.items.forEach(element => {
    //     if (element.links) {
    //         console.log(element)
    //         let obj = {
    //             date: element.data[0].date_created,
    //             title: element.data[0].title,
    //             url: element.links[0].href,
    //             "media_type": element.data[0].media_type,
    //             explanation: element.data[0].description
    //         }
    //         arr.push(obj)
    //     }
    // });
    // setPictures([...arr])

    useEffect(async () => {
        try {
            let imagesArray = [];
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=i8WgJXkiTKGEq25cHmjgUOvnczhNe9UPNrJKNSww&count=48&thumbs=true', requestOptions);
            const data = await response.json();
            console.log(data)
            await data.forEach(element => {
                if (element.media_type == 'image') {
                    // console.log(element)
                    let obj = {
                        date: element.date,
                        explanation: element.explanation,
                        media_type: element.media_type,
                        title: element.title,
                        url: element.url
                    }
                    console.log(obj);
                    imagesArray.push(obj);
                }

            });
            console.log(imagesArray)
            setAllNasaImages([...imagesArray]);
            setLoading(false);
            console.log([...allNasaImages]);
        } catch (error) {
            console.log(error);
        }
    }, []);

    async function postNasaImage(image) {
        console.log("click")
        console.log(image)
        let newImage = {
            date: image.date,
            explanation: image.explanation,
            media_type: image.media_type,
            title: image.title,
            url: image.url
        }
        try {
            const obj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userRedux._id
                },
                body: JSON.stringify(newImage)
            };
            const response = await fetch('http://localhost:3400/postNasaImageByUserId', obj);
            const data = await response.json();
            console.log(data);
            setNasaImage(newImage);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {/* <img src={[allNasaImages][0].url}></img> */}
            { loading ? <div><label>Load pictures...</label></div> : ''}
            <Container>
                <Row>
                    {/* <ul> */}
                    {allNasaImages.map((image, index) => (
                        <Col md={3}>
                            <Card>
                                <Card.Body>
                                    {/* <li key={index}> */}
                                    <Card.Title>
                                        <div>{image.title}</div>
                                    </Card.Title>

                                    {/* <img src={[allNasaImages][0].url}></img> */}
                                    <div id="img">
                                        {image.media_type == 'image' ?
                                            <img src={image.url}></img> :
                                            <ReactPlayer url={image.url} style={{
                                                width: 'width:30px',
                                                height: '30vh !important'
                                            }}></ReactPlayer>}
                                        {loading == false ? <label id="like"><a onClick={() => postNasaImage(image)}>Like</a></label> : ''}

                                    </div>
                                    {/* <img src={image.url} onClick={() => postNasaImage(image)}></img> */}
                                    {/* </li> */}
                                </Card.Body>
                            </Card>
                        </Col>

                    ))}
                    {/* <Col md={3}>aaaaaa</Col> */}
                    {/* </ul> */}
                </Row>
            </Container>
        </div>
    )
})