import React from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

class SignUp extends React.Component { 
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    };

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async e => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;
        const { signUpStart } = this.props;

        if(password !== confirmPassword) {
            alert("Passwords Don't Match");
            return;
        }

        signUpStart({ displayName, email, password });
    };

    render() {
        const { displayName, email, password, confirmPassword } = this.state;

        return (
            <div className='sign-up'>
                <h2 className='title'>I Do Not Have An Account</h2>
                <span>Sign Up With Your Email And Password</span>

                <form onSubmit={ this.handleSubmit } className='sign-up-form'>
                    <FormInput onChange={ this.handleChange } type='text' name='displayName' value={ displayName } label='Display Name' required />
                    <FormInput onChange={ this.handleChange } type='email' name='email' value={ email } label='Email' required />
                    <FormInput onChange={ this.handleChange } type='password' name='password' value={ password } label='Password' required />
                    <FormInput onChange={ this.handleChange } type='password' name='confirmPassword' value={ confirmPassword } label='Confirm Password' required />

                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);