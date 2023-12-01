import { Component} from "react";

import { Card, Button } from "react-bootstrap";

class Profile1 extends Component {

  render() {
    
    return (
    <Card border="warning" >
        <Card.Header>Developer Info</Card.Header>
        <Card.Body>
          <Card.Title text="warning">Maddie Amelia Lewis</Card.Title>
          <Card.Text>
            Maddie (they/them) spends most of their time clacking away and trying to create something cool. Thanks for visiting their Can of Books app!
          </Card.Text>
          <Button variant="outline-info" href="https://github.com/maddieamie">See their Github Profile</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default Profile1;
