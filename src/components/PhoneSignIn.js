import React, { useState } from 'react';
import { auth, RecaptchaVerifier} from '../firebase';
import { signInWithPhoneNumber } from 'firebase/auth';

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmitPhoneNumber = async (event) => {
    event.preventDefault();

    const appVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber
      },
    } , '6LezsCUlAAAAAIC0m1Y8xx7QkT44KC9BRb95hSX2');

    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const handleSubmitVerificationCode = async (event) => {
    event.preventDefault();

    try {
      await confirmationResult.confirm(verificationCode);
    } catch (error) {
      console.error('Error confirming verification code:', error);
    }
  };

  return (
    <>
      {!confirmationResult ? (
        <form onSubmit={handleSubmitPhoneNumber}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number"
            required
          />
          <button type="submit">Send verification code</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitVerificationCode}>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification code"
            required
          />
          <button type="submit">Sign in</button>
        </form>
      )}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default PhoneSignIn;
