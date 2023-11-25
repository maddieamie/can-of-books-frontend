import axios from "axios";
import React from 'react'; 

import { Carousel, Button, Alert} from "react-bootstrap";
import AlertComp from './AlertComp';
import BookFormModal from './BookFormModal';
import DeleteConfirm from "./DeleteConfirm";
import UpdateModal from "./UpdateModal";




const SERVER = import.meta.env.VITE_SERVER;

class BestBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //searchQuery: '',
      books: [],
      displayAddModal: false,
      displayUpdateModal: false,
      error: null,
      deleted: '',
      updateBook: '',
      showDeleteConfirmation: false, 
      showUpdateAlert: false,
      deleteBookId: '',
      updatedBooks: '',
      showAlert: false,
    }
  }
 
  componentDidMount() {
    console.log('component mounted')
    this.fetchBooks();
  }

  async fetchBooks() {
    console.log('fetch books running')
    let apiUrl = `${SERVER}/books`

    try {
      const response = await axios.get(apiUrl);
      this.setState({ books: response.data });

    } catch (error) {
      console.log(error);
    }
  }


  postBook = (newBook) => {
    console.log('post books running')
    
    const url = `${SERVER}/books`
    axios.post(url, newBook)
      .then(newBook => this.setState((prevState) => ({ books: [...prevState.books, newBook.data] })))
      .then(console.log(newBook))
      .then(this.fetchBooks())
      .catch ((error) => {
        console.error('Error posting book:', error);
      })
  }
  
  handleUpdate = (bookToUpdate) => {
    console.log('HandleUpdate running');

    if (!bookToUpdate._id) {
      console.error('Invalid book ID');
      return;
  }

    axios
    .put(`${SERVER}/books/${bookToUpdate._id}`, bookToUpdate)
    .then(response => {
        const updatedBook = response.data;
        this.setState(prevState => ({
            books: prevState.books.map(existingBook =>
                existingBook._id === updatedBook._id ? updatedBook : existingBook
            ),
            showUpdateAlert: true
        }));
    })
    .catch(error => {
        console.error('Error updating book:', error);
    });
}



  handleDelete = (id) => {
    console.log('handleDelete running')
    
    
    axios
      .delete(`${SERVER}/books/${id}`)
      .then((response) => {
        const deletedBook = response.data;

        this.setState({
          deleted: deletedBook,
        });
      
        const updatedBooks = this.state.books.filter((book) => book._id !== id);
        this.setState({ books: updatedBooks });


        
      })
      .then( this.setState({showAlert: true}))
      .catch((error) => {
        console.error('Error deleting book:', error);
        //need to catch for Alert badge or will it catch on its own?
        
      });
  };

  handleModal = (event) => {
      this.setState({ displayAddModal: true})
  }

  closeModal = (event) => {
    this.setState({displayAddModal: false})
  }


  handle2Modal = (book) => {
    console.log(book);

    this.setState({updateBook: book});
    this.setState({ displayUpdateModal: true});
}

  close2Modal = (event) => {
  this.setState({displayUpdateModal: false})
}


  render() {



    return (
      <>
        <h2>Books of Excellent Character</h2>

        <div id="formholder">
        <div className="d-grid">
        <Button onClick={this.handleModal} variant="outline-warning" size="lg" id="liladd">Add Book to Collection</Button>
        </div>
        {this.state.error && (
            <AlertComp
              errormessage={this.state.error}
            />
          )}

        <BookFormModal show={this.state.displayAddModal} closeModal={this.closeModal} handleModal={this.handleModal} postBook={this.postBook}/> 

        {this.state.updateBook && (
        <UpdateModal show={this.state.displayUpdateModal} closeModal={this.close2Modal} handleModal={this.handle2Modal} handleUpdate={this.handleUpdate} updateBook={this.state.updateBook}/> )}
        </div>

        
          <Carousel interval={null}  pause={!this.state.displayUpdateModal}>
          {this.state.books.length > 0 ? (
          this.state.books.map( (book, index) =>
            <Carousel.Item key={index}  data-bs-interval="false">
                <img
                  className="d-block w-100"
                  src="https://www.publicdomainpictures.net/pictures/140000/velka/black-square-with-fleck-pattern.jpg"
                  height="400px"
                  width="400px"
                  alt="black background"
                />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <small>{book.author}</small>
                <p><em>{book.genre}</em> ~~~ {book.description}</p>
                <p>This book is: <mark>{book.status ? 'Read' : 'Not Read'}</mark></p>
                <Button
                  id="deleteb1"
                  variant="danger"
                  onClick={() => this.setState({ showDeleteConfirmation: true, deleteBookId: book._id })}
                >
                  Delete Book
                </Button>
                <Button
                  id="updateb1"
                  variant="secondary"
                  onClick={() => this.handle2Modal(book)}
                >
                  Update Book
                </Button>

                {this.state.showDeleteConfirmation && (
                  <DeleteConfirm
                    handleDelete={() => {
                      this.handleDelete(this.state.deleteBookId);
                      this.setState({ showDeleteConfirmation: false });
                    }}
                  />
                )}

              </Carousel.Caption>
            </Carousel.Item>
            )
            ) : (
              <h3>No Books Found :( Please add one to our database!</h3>
            )}
            
          </Carousel>
        
          {this.state.showAlert && (
            <Alert variant="success">
                    Book Deleted!
                    <Button onClick={() => this.setState({showAlert: false})} variant="outline-success">
            Close me
          </Button>
                  </Alert>)}
         {this.state.showUpdateAlert && (
            <Alert variant="success">
                    Book Updated!
                    <Button onClick={() => this.setState({showUpdateAlert: false})} variant="outline-success">
            Close me
          </Button>
                  </Alert>)}


      </>
    )
  }
}

export default BestBooks;
