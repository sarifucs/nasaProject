import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import ImageCard from '../ImageCard/ImageCard';
import SelectedImages from '../SelectedImages/SelectedImages';
import HistoryImages from '../HistoryImages/HistoryImages';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { action } from '../../redux/action';
import { Modal, Button } from 'react-bootstrap';

function mapStateToProps(state) {
    return {
        nasaImageRedux: state.user.nasaImage,
        userRedux: state.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    setNasaImage: (image) => dispatch(action.setNasaImage(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Dashboard(props) {
    // const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    const [show, setShow] = useState(false);
    const [todayImage, setTodayImage] = useState({
        date: '',
        explanation: '',
        media_type: '',
        title: '',
        url: ''
    });
    const { userRedux, setNasaImage } = props;

    useEffect(async () => {
        try {
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=i8WgJXkiTKGEq25cHmjgUOvnczhNe9UPNrJKNSww');
            const data = await response.json();
            console.log(data);
            let objImage = {
                date: data.date,
                explanation: data.explanation,
                media_type: data.media_type,
                title: data.title,
                url: data.url,
                userId:[]
            }
            setTodayImage(objImage);
            setNasaImage(objImage);
            console.log("a" + todayImage.title);
        } catch (error) {
            console.log(error);
        }
        try {
            const obj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userRedux._id
                },
                body: JSON.stringify(todayImage)
            };
            const response = await fetch('http://localhost:3400/postNasaImageByUserId', obj);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            <Header></Header>
            <Button id="more" variant="primary" onClick={() => setShow(true)}>More pictures from nasa</Button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Choose the pictuers that you like
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SelectedImages></SelectedImages>
                </Modal.Body>
            </Modal>
            <h3>The picture of the day</h3>
            <div style={{width:'40%', margin:'0 auto'}}>
                <ImageCard nasaImage={todayImage}></ImageCard>
            </div>
            {/* name: {userRedux.userName} */}
            <HistoryImages></HistoryImages>

        </div>
    )
})