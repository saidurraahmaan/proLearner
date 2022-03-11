import React, {useState} from "react";
import "./style.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {authenticate} from "./helpers";
import GoogleLogin from "react-google-login";
import googleLogo from '../assets/images/Google.svg'

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const updateFormData = event =>
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    const handleSubmit=(e)=>{
        e.preventDefault();
        const {name, email, password} = formData;
        console.log(name,email,password)
        axios
            .post('api/user',{name,email,password})
            .then(res=>{
                authenticate(res);
                window.location="/";
            })
            .catch(e=>{
                alert('User already register')
                setFormData({
                    name: "",
                    email: "",
                    password: ""
                })
            })
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
                        value={formData.fullName}
                        onChange={e => updateFormData(e)}
                        placeholder="Full name"
                        type="text"
                        name="name"
                        required
                        className='inputValue'
                    />
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
                    >Register</button>
                </form>
                <GoogleLogin

                    render={renderProps => (
                        <button
                            className='button buttonValue'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>Register with google

                        </button>
                    )}
                    clientId="755816303759-cumqvgpa59dra33h1nsv50tkrjhn6udm.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}

                />
                <p>
                    Already have an account? <Link to='/signin'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
