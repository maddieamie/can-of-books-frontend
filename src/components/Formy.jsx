import { Component } from "react";
import { Form, Button} from "react-bootstrap";



export default class Formy extends Component{
    render(){
        return (
            <>
            
        <Form onSubmit={this.props.handleSearch}>
        <Form.Control  id= "formy" type="text" placeholder="Enter a book title to begin." size="lg" variant="outline-warning" />
        <div className="d-grid">
        <Button type='submit' variant="outline-warning" size="lg" id="lil">Find Book</Button>
        </div>
        
        </Form>
        
        </>
        )
    }
}
