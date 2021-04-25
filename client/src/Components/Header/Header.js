import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import fire from '../../fire.js';

function mapStateToProps(state) {
    return {
        userRedux: state.user
    }
}

export default connect(mapStateToProps)(function Header(props) {
    const { userRedux } = props;
    const signOut = () => {
        fire.auth().signOut()
    };
    return (
        <div>
            <Container style={{ margin: '0px' }}>
                <Row>
                    <Col md={2} style={{ margin: '0px', fontSize: 'xx-large' }}>
                        <div>
                            Hi {userRedux.userName}
                        </div>
                    </Col>
                    <Col md={2}>
                        <div style={{ fontSize: 'x-large', marginTop: '10px' }}>
                            <Link to="/" onClick={signOut}>Sign out</Link>
                        </div>
                    </Col>
                </Row>
            </Container>


        </div>
    )
})