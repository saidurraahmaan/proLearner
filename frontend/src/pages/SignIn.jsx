import React, {useState} from "react";
import "./style.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const updateFormData = event =>
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    const {email, password} = formData;

    return (
        <div className='topMargin App'>
            <div>
                <form>
                    <input
                        value={email}
                        onChange={e => updateFormData(e)}
                        placeholder="Email address"
                        type="email"
                        name="email"
                        required
                        className='inputValue'

                    />
                    <input
                        value={password}
                        onChange={e => updateFormData(e)}
                        placeholder="Password"
                        type="password"
                        name="password"
                        required
                        className='inputValue'

                    />

                    <button
                        type="submit"
                        className='buttonValue'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;