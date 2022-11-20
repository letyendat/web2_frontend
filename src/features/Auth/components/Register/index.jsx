import React from 'react';
import RegisterForm from '../RegisterForm';

// eslint-disable-next-line no-use-before-define
Register.propTypes = {
    
};

// eslint-disable-next-line no-unused-vars
function Register(props) {
    const handleSubmit = (values) => {
        // eslint-disable-next-line no-console
        console.log('Form Submit:', values);
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;