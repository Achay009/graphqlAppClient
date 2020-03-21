import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { ApolloProvider } from 'react-apollo'
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost';
import AddBook from './components/AddBook'

const client = new ApolloClient({
  uri: ' https://graphql-book-server.now.sh/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App" id="main">
          <h1>GraphQL List</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
