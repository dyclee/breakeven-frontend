import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createAccount } from './fetches/authentication';
import SignupForm from './SignUpForm';

const SignUpButton = () => {
const handleClick = () => {
    return (
        <SignupForm />
    )
}
  return (
      <Button color="secondary" onClick={handleClick}>Create account</Button>
  );
}

export default SignUpButton;
