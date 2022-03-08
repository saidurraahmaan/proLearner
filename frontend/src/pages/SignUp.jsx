import React, {useState} from "react";
import "./style.css";
import {Link} from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
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
        const {fullName, email, password} = formData;

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
                        name="fullName"
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
