import React, { useState } from 'react';
import styled from '@emotion/styled';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormInput = styled.input`
  padding: 10px;
  margin: 5px 0;
`;

const FormButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const signUp = (e) => {
    e.preventDefault();
    if(password.length < 6 ){
      alert('Password must be at least 6 charecters long. ');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.updateProfile({
          displayName: displayName,
        });
        console.log('User signed up:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing up:', errorCode, errorMessage);
      });
  };

  return (
    <FormContainer>
      <h2>Sign Up</h2>
      <form onSubmit={signUp}>
        <FormInput
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormButton type="submit">Sign Up</FormButton>
      </form>
    </FormContainer>
  );
}

export default SignUp;
