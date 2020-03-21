import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'



class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
        this.displayBooks = this.displayBooks.bind(this)

    }

    displayBooks = () => {
        var data = this.props.data
        if (data.loading) {
            return (<div>Books Loading .....</div>)
        } else {
            return data.books.map(book => {
                return (<li key={book.id} onClick={(e) => this.setState({ selected: book.id })}>{book.name}</li>)
            })
        }
    }
    render() {
        // console.log(this.props)
        return (
            <>
                <ul id="book-list">{this.displayBooks()}</ul>
                <BookDetails selectedBook={this.state.selected} />
            </>
        );
    }
}

export default graphql(getBooksQuery)(BookList);