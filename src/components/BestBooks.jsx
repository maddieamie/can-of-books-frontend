import React from 'react';
import { Carousel, Image, Button } from "react-bootstrap";
import axios from "axios";
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

  /*async findBook() {
    const url = `${SERVER}/books?title=${title}`
    try {
      const res = await axios.get(url);
      this.setState({books: res.data});
    }
    catch (error){
      console.log(error);
    }
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { searchQuery } = this.state;
    
   

    // Make the API request to the server (backend) to avoid exposing the key
    axios.get(`${SERVER}/?title=${searchQuery}`)
      .then(async (response) => {
        const bookdata = response.data;
        console.log(bookdata);
        this.setState({books: bookdata})
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ error: `An error occurred: ${error.message}. Code: ${error.code}.` });
      });
  } */

  /*handleTitleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.value;
    //this.setState({title: newtitle})
    this.findBook(title);

  }*/


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
        <div className="d-grid">
        <Button onClick={this.handleModal} variant="outline-warning" size="lg" id="liladd">Add Book to Collection</Button>
        </div>

        <BookFormModal closeModal={this.closeModal} handleModal={this.handleModal} postBook={this.postBook}/> 
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
              </Carousel.Caption>
              <Button id="deleteb1" variant="danger" onClick={() => this.handleDelete(book._id)}>Delete Book</Button> 
              <ToastAlert handleDelete={this.handleDelete} closeToast={this.closeToast} deleted={this.state.deleted}/>
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
