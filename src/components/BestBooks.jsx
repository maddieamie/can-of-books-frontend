import axios from "axios";
import React from 'react';
import { Carousel, Button, Modal } from "react-bootstrap";
import AlertComp from './AlertComp';
import BookFormModal from './BookFormModal';
import ToastAlert from './ToastAlert';


const SERVER = import.meta.env.VITE_SERVER;

class BestBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //searchQuery: '',
      books: [],
      displayModal: false,
      error: null,
      displayToast1: false,
      displayToast2: false,
      deleted: ''
    }
  }
 
  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    let apiUrl = `${SERVER}/books`

    try {
      const response = await axios.get(apiUrl);
      this.setState({ books: response.data });

    } catch (error) {
      console.log(error);
    }
  }


  postBook = (newBook) => {

    
    const url = `${SERVER}/books`
    axios.post(url, newBook)
      .then(res => newBook = res.data)
      .then(newBook => this.setState({ books: [...this.state.books, newBook] }))
      .then(console.log(newBook))
      .then(this.fetchBooks())
      .catch ((error) => {
        console.error('Error posting book:', error);
      });
  }

  handleDelete = (id) => {
    
    axios
      .delete(`${SERVER}/books/${id}`)
      .then((response) => {
        const deletedBook = response.data;

        this.setState({
          displayToast1: false,
          displayToast2: true,
          deleted: deletedBook,
        });

        const updatedBooks = this.state.books.filter((book) => book._id !== id);
        this.setState({ books: updatedBooks });
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        //need to catch for Alert badge or will it catch on its own?
        this.setState({ displayToast1: false });
      });
  };

  closeToast = (event) => {
    this.setState({displayToast1: false, displayToast2: false})
  }

  openToast = (event) => {
    this.setState({displayToast1: true})
  }


  handleModal = (event) => {
      this.setState({ displayModal: true})
  }

  closeModal = (event) => {
    this.setState({displayModal: false})
  }


  render() {



    return (
      <>
        <h2>Books of Excellent Character</h2>

        <div id="formholder">
        <div className="d-grid">
        <Button onClick={this.handleModal} variant="outline-warning" size="lg" id="liladd">Add Book to Collection</Button>
        </div>

        <BookFormModal show={this.state.displayModal} closeModal={this.closeModal} handleModal={this.handleModal} postBook={this.postBook}/> 
        </div>

        
          <Carousel>
          {this.state.books.length > 0 ? (
          this.state.books.map( (book, index) =>
            <Carousel.Item key={index}>
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
                <Button id="deleteb1" variant="danger" onClick={this.openToast}>Delete Book</Button> 
              <ToastAlert handleDelete={this.handleDelete(book._id)} closeToast={this.closeToast} deleted={this.state.deleted}/>
              </Carousel.Caption>
            </Carousel.Item>
            )
            ) : (
              <h3>No Books Found :( Please add one to our database!</h3>
            )}
            
          </Carousel>
        

            {this.state.error && (
            <AlertComp
              errormessage={this.state.error}
            />
          )}
      </>
    )
  }
}

export default BestBooks;
