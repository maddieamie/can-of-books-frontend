import React from 'react';
import { Component } from "react";
import { Modal, Form} from "react-bootstrap";


export default class BookFormModal extends Component{

    submitHandler = (e) => {
        e.preventDefault();

        const form = e.target;
        // console.log(form);

        const newBook = {
            title: form.title.value,
            author: form.author.value,
            genre: form.genre.value,
            description: form.description.value,
            status: form.status.checked
        };

        this.props.postBook(newBook);
    }

    render(){
    return (
    <>
      <Modal show={show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <Form onSubmit={this.submitHandler}>

            <Form.Group controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="author">
                <Form.Label>Book Author</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="genre">
                <Form.Label>Book Genre(s): Fantasy, Sci-Fi, Horror, Mystery...</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Book Description. Example: 'The remote island of Masquapaug has not seen a dragon in many generations—until fifteen-year-old Anequs finds...'</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="status">
                        <Form.Check type="checkbox" label="Click box if you have read this book." />
                    </Form.Group>


            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.closeModal}>
            Close Without Saving
          </Button>
          <Button variant="primary" onClick={this.props.postBook}>
            Save & Add Book to Collection
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
}