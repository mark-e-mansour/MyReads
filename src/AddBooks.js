import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class AddBooks extends Component {
    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))

        if (query !== '') {
            BooksAPI.search(query.trim(), 20)
                .then((books) => {
                    const { items } = books
                    this.setState((currentState) => ({
                        books: items !== undefined ? currentState.books : books,
                        query: currentState.query
                    }))
                })
        }
        else {
            this.setState(() => ({
                books: []
            }))
        }
    }

    updateBookShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((shelf) => {
                this.props.onUpateMainPage()
            })
    }

    render() {
        const { query, books } = this.state
        const { booksOnShelves } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search"
                        to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {query !== '' && (
                        <ListBooks books={books} booksOnShelves={booksOnShelves} shelf="" onUpdateBookShelf={(book, shelf) => {
                            this.updateBookShelf(book, shelf)
                        }} query={query} />
                    )}
                </div>
            </div>
        )
    }
}

export default AddBooks