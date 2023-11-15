import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './About';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; //going after bootstrap will override it easier.
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



class App extends React.Component {

  
  

  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
          
            <Route 
              path="/about"
              element={<Profile />}
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
