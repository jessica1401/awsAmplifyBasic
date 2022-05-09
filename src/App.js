import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfog from './aws-exports';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import SongList from './components/SongList';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Insider from './components/Insider';

Amplify.configure(awsconfog);

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    AssedLogedInState();
  }, []);
  const AssedLogedInState = () => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  };
  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (err) { 
      console.log(err, 'SIGNING OUT');
    }
  };
  const onSignIn = () => {
    setLoggedIn(true)
  }
  return (
    <Router>
      <div>
        {/* <AmplifySignOut />  */}
        {loggedIn ? (
          <button onClick={signOut}>SIGN OUT</button>
        ) : (
          <Link to={'/sign-in'}>
            <button onClick={signOut}>SIGN IN</button>
          </Link>
        )}
        <h2>My App Header</h2>
      </div>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/sign-in" element={<SignIn onSignIn={onSignIn} />} />
        {loggedIn && <Route path="/insider" element={<Insider />} />}
      </Routes>
    </Router>
  );
}

// export default withAuthenticator(App);
export default App;
