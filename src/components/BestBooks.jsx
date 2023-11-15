import React from 'react';
import { Carousel, Image, Button } from "react-bootstrap";
import axios from "axios";
import Formy from './Formy';
import AlertComp from './AlertComp';


const SERVER = import.meta.env.VITE_SERVER;

class BestBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
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

  async fetchBooks(title = null) {
    let apiUrl = `${SERVER}/books`;

    if (title) {
      apiUrl += `?title=${title}`;
    }

    try {
      const response = await axios.get(apiUrl);
      this.setState({ books: response.data });

    } catch (error) {
      console.log(error);
    }
  }

  handleTitleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.location.value;
    this.setState({title: title})
    console.log({ title });
    this.fetchBooks(title);
  }


  postBook = (newBook) => {
    const url = `${SERVER}/books`
    axios.post(url, newBook)
      .then(res => this.setState({ books: [...this.state.books, res.data] }))
  }

  handleDelete = (id) => {
    this.setState({displayToast1: true})

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
        <Formy 
        handleTitleSubmit={this.handleTitleSubmit} />
        <div className="d-grid">
        <Button onClick={this.handleModal} variant="warning" size="lg" id="liladd">Add Book to Collection</Button>
        </div>

        <BookFormModal closeModal={this.closeModal} handleModal={this.handleModal} postBook={this.postBook}/> 
        </div>

        {this.state.books.length ? (
          this.state.books.map( (book) =>
          <Carousel>
            <Carousel.Item id={book._id}>
              <Image src="https://images.pexels.com/photos/3309961/pexels-photo-3309961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" text="Img from Elīna Arāja on Pexels.com" alt="an open book with a pressed wildflower bookmark" />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <small className="text-body-secondary">{book.author}</small>
                <p><em>{book.genre}</em> ~~~ {book.description}</p>
                <p>This book is: <mark>{{book.status ? 'Read' : 'Not Read'}}</mark></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item><Button id="deleteb1" variant="danger" onClick={() => this.handleDelete(book._id)}>Delete Book</Button> 
            <ToastAlert handleDelete={this.handleDelete} closeToast={this.closeToast} deleted={this.state.deleted}/>
            </Carousel.Item>
          </Carousel>
        )
        ) : (
          <h3>No Books Found :( Please add one to our database!</h3>
        )}

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
