import React from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

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

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            
            this.setState({ email: '', password: '' });
        } catch(error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div className='sign-in'>
                <h2>I Already Have An Account</h2>
                <span>Sign In With Your Email And Password</span>

                <form onSubmit={ this.handleSubmit }>
                    <FormInput handleChange={ this.handleChange } name='email' type='email' label='Email' value={ this.state.email } required />
                    <FormInput handleChange={ this.handleChange } name='password' type='password' label='Password' value={ this.state.password } required />

                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={ signInWithGoogle } isGoogleSignIn type='button'>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    };
};

export default SignIn;