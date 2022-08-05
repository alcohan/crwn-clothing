import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

import {
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithEmail
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields( {...formFields, [name]:value} )
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInWithEmail(email,password);
            alert('signed in')
            resetFormFields();
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password': alert('Incorrect password'); break;
                case 'auth/user-not-found': alert('Email not found'); break;
                default: console.log(error);
            }
        }
    };

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
                <div className='buttons-container'>
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType='google' onClick = {signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
        );
};

export default SignInForm;