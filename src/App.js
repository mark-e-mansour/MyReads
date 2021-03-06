import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import AddBooks from './AddBooks'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

	//Method for reloading books on main page after updates are done
    reloadMainPage = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

	//Method for updaing books after changing shelves
    updateBookShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((shelf) => {
                this.reloadMainPage()
            })
    }

    render() {
        const { books } = this.state
        return (
            <div className="app">
                <Route exact path='/' render={({ history }) => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        <ListBooks books={books} shelf="currentlyReading" onUpdateBookShelf={(book, shelf) => {
                                            this.updateBookShelf(book, shelf)
                                        }} query='' />
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ListBooks books={books} shelf="wantToRead" onUpdateBookShelf={(book, shelf) => {
                                            this.updateBookShelf(book, shelf)
                                        }} query='' />
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ListBooks books={books} shelf="read" onUpdateBookShelf={(book, shelf) => {
                                            this.updateBookShelf(book, shelf)
                                        }} query='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link
                                to='/search'>
                                Add a book
				</Link>
                        </div>
                    </div>
                )}
                />
                <Route path='/search' render={() => (
                    <AddBooks booksOnShelves={books} onUpateMainPage={this.reloadMainPage()} />
                )} />

            </div>
        )
    }
}

export default BooksApp