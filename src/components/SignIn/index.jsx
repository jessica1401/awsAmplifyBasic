import { Auth } from 'aws-amplify';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const signIn = async ({onSignIn }) => {
    try {
      await Auth.signIn(email, password);
      navigate('/');
      onSignIn()
    } catch (err) {
      console.log('Error in Sign In', err);
    }
  };
  return (
    <div>
      <h2>Sign In Page</h2>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={signIn}>SIGN IN</button>
    </div>
  );
}
