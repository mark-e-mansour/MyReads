import React, { Component } from 'react'

class ListBooks extends Component {
    render() {
        const { books, shelf, onUpdateBookShelf, booksOnShelves, query } = this.props

        let showingBooks = []

        if (shelf !== '') {
            showingBooks = books.filter((b) => (
                b.shelf.toLowerCase() === shelf.toLowerCase()
            ))
        }

        if (query !== '') {
            showingBooks = books.filter((b) => (
                b.title.toLowerCase().includes(query.toLowerCase())
            ))
        }

        if (booksOnShelves !== undefined) {
            for (const bos of booksOnShelves) {
                showingBooks.filter((b) => {
                    return b.id === bos.id
                }).map((book) => book.shelf = bos.shelf)
            }
        }

        //Fix for books with empty Thumbnails
        showingBooks.filter((b) => {
            return b.imageLinks === undefined
        }).map((book) => book.imageLinks = { thumbnail: '#' })


        return (
            <ol className="books-grid">
                {showingBooks.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                    width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`
                                }}>
                                </div>
                                <div className="book-shelf-changer">
                                    <select onChange={(event) => onUpdateBookShelf(book, event.target.value)} value={book.shelf === undefined ? 'none' : book.shelf}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                    </li>
                ))}

            </ol>
        )
    }
}

export default ListBooks