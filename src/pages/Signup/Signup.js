import React, { useContext, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import './Signup.css'

const Signup = () => {
    const { setUpReCaptcha } = useContext(AuthContext);
    console.log(setUpReCaptcha);
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState("")
    const navigate = useNavigate()
    const getOtp = async (e) => {
        e.preventDefault();
        setError("")
        if (number === "" || number === undefined) {
            return setError("Please enter a valid number")
        }
        try {
            const response = await setUpReCaptcha(number);
            console.log(response);
            setConfirmObj(response);
            setFlag(true);
        } catch (err) {
            setError(err.message)
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        console.log(otp);
        if (otp === "" || otp === undefined) {
            return
        }
        try {
            setError("")
            await confirmObj.confirm(otp);
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='container'>
            <form className='form' onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
                <label htmlFor="">Enter Your Phone Number</label>
                <PhoneInput
                    style={{ width: "200px" }}
                    className=''
                    defaultCountry='BD'
                    // flags="none"
                    placeholder="Enter phone number"
                    value={number}
                    onChange={setNumber} />
                <div id='recaptcha-container' />
                <button type="submit">Submit</button>
            </form>
            <form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
                <input type="text" placeholder='Enter otp' onChange={e => setOtp(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Signup;