import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
    // state = {  }
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    displayBookDetails = () => {
        const { book } = this.props.data

        if (book) {
            return (
                <div>
                    <h2> Book Name : {book.name}</h2>
                    <p>Book Genre : {book.genre}</p>
                    <p>Book Author : {book.author.name}</p>
                    <p>All other Books by Author</p>
                    <ul id="other-books">
                        {book.author.books.map(book => {
                            return <li key={book.id}>{book.name}</li>
                        })}
                    </ul>
                </div>
            )
        } else {
            return (<div>No Selected Book.........</div>)
        }
    }
    render() {
        console.log(this.props)
        return (
            <>
                <div id="book-details">
                    <p>Output Book Details</p>
                    {this.displayBookDetails()}
                    <hr />
                </div>
            </>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.selectedBook
            }
        }
    }
})(BookDetails);