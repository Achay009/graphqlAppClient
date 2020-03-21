import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'



class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
        this.onChanged = this.onChanged.bind(this)
        this.displayAuthors = this.displayAuthors.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    }


    onChanged = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({ [name]: value })
        // console.log(this.state)
    }
    displayAuthors = () => {
        var data = this.props.getAuthorsQuery
        // console.log(this.props)
        if (data.loading) {
            return (<option disabled>Authors Loading .....</option>)
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }
    render() {
        return (
            <>
                <SubmitForm
                    getAuthors={this.displayAuthors()}
                    state={this.state}
                    onChange={this.onChanged}
                    onSubmit={this.handleSubmit} />
            </>
        );
    }
}

const SubmitForm = (props) => {
    return (
        <form id="add-book" onSubmit={(e) => props.onSubmit(e)}>
            <div className="field">
                <label>Book Name :</label>
                <input type="text" name="name" value={props.state.name} onChange={(e) => props.onChange(e)} />
            </div>
            <div className="field">
                <label>Genre :</label>
                <input type="text" name="genre" value={props.state.genre} onChange={(e) => props.onChange(e)} />
            </div>
            <div className="field">
                <label>Author :</label>
                <select name="authorId" value={props.state.authorId} onChange={(e) => props.onChange(e)}>
                    <option>Select Author</option>
                    {props.getAuthors}
                </select>
            </div>

            <button>+</button>
        </form>
    );
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);