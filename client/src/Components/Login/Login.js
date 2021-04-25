import React, { useEffect, useRef, useState } from 'react';
import './Login.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { action } from '../../redux/action';
import fire from '../../fire.js';
import history from '../../config/history';

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    setUserDetails: (user) => dispatch(action.setUserDetails(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
    let [userNameRequired, setUserNameRequired] = useState(true);
    let [emailRequired, setEmailRequired] = useState(true);
    let [passwordRequired, setPasswordRequired] = useState(true);
    let [passwordLengthRequired, setPasswordLengthRequired] = useState(true);
    let [viewCreateUser, setViewCreateUser] = useState(false);
    // const [user, setUser] = useState({});

    const { setUserDetails } = props;

    const userNameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();

    const checkValidation = () => {
        setUserNameRequired(true);
        setEmailRequired(true);
        setPasswordRequired(true);
        setPasswordLengthRequired(true);
        let help = 0;
        if (userNameRef.current.value == '') {
            setUserNameRequired(false);
            help = 1;
        }
        if (emailRef.current.value == '') {
            setEmailRequired(false);
            help = 1;
        }
        if (passwordRef.current.value == '') {
            setPasswordRequired(false);
            help = 1;
        } else if (passwordRef.current.value.toString().length < 8) {
            setPasswordLengthRequired(false);
            help = 1;
        }
        return help;
    }
    // const createToken = () => {
    //     const user = fire.auth().currentUser;
    //     const token = user && (user.getIdToken());
    //     const payloadHeader = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`,
    //         },
    //     };
    //     return payloadHeader;
    // }
    const login = async () => {
        // setUserDetails(objUser)
        // setUser({...objUser});
        // console.log(user);
        if (checkValidation() == 0) {
            try {
                let objUser = {
                    userName: userNameRef.current.value,
                    password: passwordRef.current.value,
                    email: emailRef.current.value
                }
                // fire.auth().signInWithEmailAndPassword(objUser.email, objUser.password);
                // const header = createToken();
                // let obj = {
                //     method: 'POST',
                //     headers: header.headers,
                //     body: JSON.stringify(objUser)
                // };
                const obj = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objUser)
                };
                const response = await fetch('http://localhost:3400/loginUser', obj);
                const data = await response.json();
                console.log(data);
                if (data == false) {
                    setViewCreateUser(true);
                } else {
                    console.log(data);
                    await setUserDetails(data);
                    // localStorage.setItem("token", data.token);
                    history.push("/dashboard")
                    // await window.location.replace('http://localhost:3000/dashboard');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const createUser = async () => {
        try {
            let objUser = {
                userName: userNameRef.current.value,
                password: passwordRef.current.value,
                email: emailRef.current.value
            }
            // fire.auth().createUserWithEmailAndPassword(objUser.email, objUser.password);
            // const header =  createToken();
            //     let obj = {
            //         method: 'POST',
            //         headers: header.headers,
            //         body: JSON.stringify(objUser)
            //     };
            const obj = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objUser)
            };
            const response = await fetch('http://localhost:3400/createUser', obj);
            const data = await response.json();
            console.log(data);
            await setUserDetails(data);
            // await window.location.replace('http://localhost:3000/dashboard');
            history.push("/dashboard")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="container">
            <div id="formLogin">
                <InputGroup className="mb-3">
                    <label className="required">*</label>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">User name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl ref={userNameRef}
                        type="text"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                    <div className="warnning">
                        <label>{userNameRequired == false ? 'This is a required field' : ''}</label>
                    </div>
                </InputGroup>

                <InputGroup className="mb-3">
                    <label className="required">*</label>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl ref={emailRef}
                        // type="email"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        max-length="20"
                    />
                    <div className="warnning">
                        <label>{emailRequired == false ? 'This is a required field' : ''}</label>
                    </div>
                </InputGroup>
                <InputGroup className="mb-3">
                    <label className="required">*</label>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl ref={passwordRef}
                        type="password"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        max-length="20"
                    />
                    <div className="warnning">
                        <label>{passwordRequired == false ? 'This is a required field' : ''}</label>
                    </div>
                    <div className="warnning">
                        <label>{passwordLengthRequired == false && passwordRequired == true ? 'Must complete at least 8 characters' : ''}</label>
                    </div>
                </InputGroup>
                <Button onClick={login}>Login</Button>
                {viewCreateUser ?
                    <div id="create">
                        <label className="warnning">The user does not exist</label>
                        <Button onClick={createUser}>Create new user</Button>
                    </div> : ''
                }
            </div>
        </div>
    )
})