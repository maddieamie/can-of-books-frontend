import React from 'react';
import { Carousel, Image } from "react-bootstrap";
import axios from "axios";
import Formy from './Formy';

const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      books: []
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


  render() {



    return (
      <>
        <h2>Books of Excellent Character</h2>

        <div id="formholder">
        <Formy 
        handleTitleSubmit={this.handleTitleSubmit} />
        </div>

        {this.state.books.length ? (
          this.state.books.map( (book, idx) =>
          <Carousel>
            <Carousel.Item id={idx}>
              <Image src="https://images.pexels.com/photos/3309961/pexels-photo-3309961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" text="Img from Elīna Arāja on Pexels.com" alt="an open book with a pressed wildflower bookmark" />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <small class="text-body-secondary">{book.author}</small>
                <p><em>{book.genre}</em> ~~~ {book.description}</p>
                <p>This book is: <mark>{book.status}</mark></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        )
        ) : (
          <h3>No Books Found :( Please add one to our database!</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
