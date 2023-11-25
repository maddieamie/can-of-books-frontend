import React from 'react';
import { Component } from "react";
import { Modal, Form, Button} from "react-bootstrap";




export default class UpdateModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
          _id: props.updateBook?._id,
          title: props.updateBook?.title || '',
          author: props.updateBook?.author || '',
          genre: props.updateBook?.genre || '',
          description: props.updateBook?.description || '',
          status: props.updateBook?.checked ? true: false 
        }
      }

    submitHandler2 = (event) => {
        event.preventDefault();
        const uBook = this.state;

        this.props.handleUpdate(uBook);
        this.props.closeModal();
    }

    handleTitleChange = event => {
        this.setState({ title: event.target.value });
      };

    handleAuthorChange = event => {
        this.setState({ author: event.target.value });
      };

    handleGenreChange = event => {
        this.setState({ genre: event.target.value });
      };
    
    handleDescripChange = event => {
        this.setState({ description: event.target.value });
      };
    
    handleStatusChange = event => {
        this.setState({ status: event.target.checked });
      };

    render(){
    return (
    <>
      <Modal show={this.props.show} onHide={() => { this.props.closeModal()}}>


        <Modal.Header closeButton={this.props.closeModal}>
          <Modal.Title>Update Book Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <Form onSubmit={this.submitHandler2}>

            <Form.Group controlId="titlef">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" onChange={this.handleTitleChange} value={this.state.title} />
            </Form.Group> 

            <Form.Group controlId="authorf">
                <Form.Label>Book Author</Form.Label>
                <Form.Control type="text" onChange={this.handleAuthorChange} value={this.state.author}/>
            </Form.Group>

            <Form.Group controlId="genref">
                <Form.Label>Book Genre(s): Fantasy, Sci-Fi, Horror, Mystery...</Form.Label>
                <Form.Control type="text" onChange={this.handleGenreChange} value={this.state.genre} />
            </Form.Group>

            <Form.Group controlId="descriptionf">
                <Form.Label>Book Description. Example: 'The remote island of Masquapaug has not seen a dragon in many generations—until fifteen-year-old Anequs finds...'</Form.Label>
                <Form.Control type="text" onChange={this.handleDescripChange} value={this.state.description} />
            </Form.Group>

            <Form.Group controlId="formstatus">
                        <Form.Check type="checkbox" label="Click box if you have read this book." onChange={this.handleStatusChange} value={this.state.status} />

                    </Form.Group>

          <Button variant="primary" type="submit">
            Update Book in Collection
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