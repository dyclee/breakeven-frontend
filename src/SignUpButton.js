import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createAccount } from './fetches/authentication'

export default function SignUpButton() {

  return (
      <Button color="secondary" >Create account</Button>
  );
}
