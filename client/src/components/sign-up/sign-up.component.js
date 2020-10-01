import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => { 
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleChange = e => {
        const { value, name } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords Don't Match");
            return;
        }

        signUpStart({ displayName, email, password });
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I Do Not Have An Account</h2>
            <span>Sign Up With Your Email And Password</span>

            <form onSubmit={ handleSubmit } className='sign-up-form'>
                <FormInput onChange={ handleChange } type='text' name='displayName' value={ displayName } label='Display Name' required />
                <FormInput onChange={ handleChange } type='email' name='email' value={ email } label='Email' required />
                <FormInput onChange={ handleChange } type='password' name='password' value={ password } label='Password' required />
                <FormInput onChange={ handleChange } type='password' name='confirmPassword' value={ confirmPassword } label='Confirm Password' required />

                <CustomButton type='submit'>Sign Up</CustomButton>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);