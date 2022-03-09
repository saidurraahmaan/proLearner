import React, {useState} from "react";
import "./style.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {authenticate} from "./helpers";

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
                <p>
                    Already have an account? <Link to='/signin'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
