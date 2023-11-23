import React from 'react';
import { Component } from "react";
import { Modal, Form, Button} from "react-bootstrap";




export default class BookFormModal extends Component{

    submitHandler = (event) => {
        event.preventDefault();

        this.props.postBook({
            
                "title": event.target.titlef.value,
                "author": event.target.authorf.value,
                "genre": event.target.genref.value,
                "description": event.target.descriptionf.value,
                "status": event.target.formstatus.checked ? true : false 
        });
        this.props.closeModal();
    }

    render(){
    return (
    <>
      <Modal show={this.props.show} onHide={() => { this.props.closeModal()}}>


        <Modal.Header closeButton={this.props.closeModal}>
          <Modal.Title>Add Book Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <Form onSubmit={this.submitHandler}>

            <Form.Group controlId="titlef">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="authorf">
                <Form.Label>Book Author</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="genref">
                <Form.Label>Book Genre(s): Fantasy, Sci-Fi, Horror, Mystery...</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="descriptionf">
                <Form.Label>Book Description. Example: 'The remote island of Masquapaug has not seen a dragon in many generations—until fifteen-year-old Anequs finds...'</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formstatus">
                        <Form.Check type="checkbox" label="Click box if you have read this book." value="true" />

                    </Form.Group>

          <Button variant="primary" type="submit">
            Save & Add Book to Collection
          </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={this.props.closeModal}>
            Close Without Saving
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
}