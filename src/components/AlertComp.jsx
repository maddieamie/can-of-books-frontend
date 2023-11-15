import { Component } from "react";
import { Alert } from "react-bootstrap";


export default class AlertComp extends Component{
    render(){
        return (
            <>
           <div>
          <Alert variant="danger">
        Oh no! {this.props.errormessage} Looks like something went wrong. 
        </Alert>
        </div> 
            </>
        )
    }
}