import React, {useState} from "react";
import "./style.css";
import {Link, useNavigate, Navigate} from 'react-router-dom';
import {authenticate, getUser} from "./helpers";
import axios from "axios";
import GoogleLogin from "react-google-login";


const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const updateFormData = event =>
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = formData;
        axios
            .post('api/user/login', {email, password})
            .then(res => {
                authenticate(res);
                window.location = "/";
            })
            .catch(e => {
                alert('Invalid Credential');
            });
    }

    const googleSuccess = async (res) => {
        const token = res?.tokenId;
        try{
            axios
                .post('api/user/googleLogin', {tokenId: res.tokenId})
                .then(res => {
                    authenticate(res);
                    window.location = "/";
                })

        }catch (e) {
            console.log(e)
        }
    }
    const googleFailure = () => {
        console.log("Google signin failed");
    }
    return (
        <div className='topMargin App'>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        value={formData.email}
                        onChange={e => updateFormData(e)}
                        placeholder="Email address"
                        type="email"
                        name="email"
                        required
                        className='inputValue'

                    />
                    <input
                        value={formData.password}
                        onChange={e => updateFormData(e)}
                        placeholder="Password"
                        type="password"
                        name="password"
                        required
                        className='inputValue'

                    />

                    <button
                        type="submit"
                        className='buttonValue button'
                    >
                        Login
                    </button>
                    <GoogleLogin

                        render={renderProps => (
                            <button
                                className='button buttonValue'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}>Login with google

                            </button>
                        )}
                        clientId="755816303759-cumqvgpa59dra33h1nsv50tkrjhn6udm.apps.googleusercontent.com"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}

                    />
                    <p>
                        Don't have an account? <Link to='/signup'>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
