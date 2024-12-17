import React, { useState } from 'react';
    import styles from './BookForm.module.css';
    import { generateBookContent } from '@/utils/gemini';

    const BookForm = ({ book, onSave, onClose }) => {
      const [title, setTitle] = useState(book?.title || '');
      const [synopsis, setSynopsis] = useState(book?.synopsis || '');

      const handleAiFill = async () => {
        try {
          const generatedContent = await generateBookContent(title, synopsis);
          setTitle(generatedContent.title);
          setSynopsis(generatedContent.synopsis);
        } catch (error) {
          console.error('Error generating content with AI', error);
          alert('Failed to generate content with AI. Please check your API key and try again.');
        }
      };

      const handleSubmit = async event => {
        event.preventDefault();
        const updatedBook = { title, synopsis };
        const method = book ? 'PUT' : 'POST';
        const url = book ? `/api/books/${book.id}` : '/api/books';

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBook),
        });

        if (response.ok) {
          onSave();
        } else {
          console.error('Failed to save book');
        }
      };

      return (
        <div className={styles.formOverlay}>
          <form className={styles.bookForm} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <label htmlFor="title">Title:</label>
              <button type="button" className={styles.aiButton} onClick={handleAiFill}>
                ✨
              </button>
            </div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <label htmlFor="synopsis">Synopsis:</label>
            <textarea
              id="synopsis"
              value={synopsis}
              onChange={e => setSynopsis(e.target.value)}
            />

            <div className={styles.formButtons}>
              <button type="submit">Save</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
    };

    export default BookForm;
