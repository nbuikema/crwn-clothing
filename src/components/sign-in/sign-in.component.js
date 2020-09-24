import React from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    };

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ email: '', password: '' });
    };

    render() {
        return (
            <div className='sign-in'>
                <h2>I Already Have An Account</h2>
                <span>Sign In With Your Email And Password</span>

                <form onSubmit={ this.handleSubmit }>
                    <FormInput handleChange={ this.handleChange } name='email' type='email' label='Email' value={ this.state.email } required />
                    <FormInput handleChange={ this.handleChange } name='password' type='password' label='Password' value={ this.state.password } required />

                    <CustomButton type='submit'>Sign In</CustomButton>
                </form>
            </div>
        );
    };
};

export default SignIn;