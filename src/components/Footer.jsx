import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Project concept & prompts brought to you by Code Fellows</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
