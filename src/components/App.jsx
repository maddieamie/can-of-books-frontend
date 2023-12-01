import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile1 from './About';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css'; //going after bootstrap will override it easier.
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";




class App extends React.Component {

  
  

  render() {

    const {isAuthenticated} = this.props.auth0;

    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={isAuthenticated ? <BestBooks /> : <h3>Please login :)</h3>}
            >
            </Route>
          
            <Route 
              path="/about"
              element={<Profile1 />}
            >
            </Route>

            <Route 
              path="/profile"
              element={<Profile />}>
            </Route>

          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
