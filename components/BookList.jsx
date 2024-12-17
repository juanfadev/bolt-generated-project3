import React, { useState } from 'react';
    import Link from 'next/link';
    import styles from './BookList.module.css';
    import BookForm from './BookForm';

    const BookList = ({ books, setBooks }) => {
      const [editingBook, setEditingBook] = useState(null);

      const handleDelete = async bookId => {
        const response = await fetch(`/api/books/${bookId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBooks(books.filter(book => book.id !== bookId));
        } else {
          console.error('Failed to delete book');
        }
      };

      const handleEdit = book => {
        setEditingBook(book);
      };

      const handleBookUpdated = async () => {
        const response = await fetch('/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
        setEditingBook(null);
      };

      const handleCloseForm = () => {
        setEditingBook(null);
      };

      return (
        <div>
          <ul className={styles.bookList}>
            {books.map(book => (
              <li key={book.id} className={styles.bookItem}>
                <Link href={`/books/${book.id}`}>
                  <span className={styles.bookTitle}>{book.title}</span>
                </Link>
                <div className={styles.bookActions}>
                  <button className={styles.editButton} onClick={() => handleEdit(book)}>
                    Edit
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(book.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {editingBook && (
            <BookForm book={editingBook} onSave={handleBookUpdated} onClose={handleCloseForm} />
          )}
        </div>
      );
    };

    export default BookList;
