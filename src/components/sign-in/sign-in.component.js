import React, { useState } from 'react';
import { connect } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { email, password } = userCredentials;

    const handleChange = e => {
        const { value, name } = e.target;
        setCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        emailSignInStart(email, password);
    };

    return (
        <div className='sign-in'>
            <h2>I Already Have An Account</h2>
            <span>Sign In With Your Email And Password</span>

            <form onSubmit={ handleSubmit }>
                <FormInput handleChange={ handleChange } name='email' type='email' label='Email' value={ email } required />
                <FormInput handleChange={ handleChange } name='password' type='password' label='Password' value={ password } required />

                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={ googleSignInStart } isGoogleSignIn type='button'>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);