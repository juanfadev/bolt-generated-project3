import React, { useState } from 'react';
    import Link from 'next/link';
    import styles from './ChapterList.module.css';
    import ChapterForm from './ChapterForm';

    const ChapterList = ({ bookId, chapters, setBook }) => {
      const [editingChapter, setEditingChapter] = useState(null);

      const handleDelete = async chapterId => {
        const response = await fetch(`/api/books/${bookId}/chapters/${chapterId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Refresh the book data
          const bookResponse = await fetch(`/api/books/${bookId}`);
          if (bookResponse.ok) {
            const updatedBook = await bookResponse.json();
            setBook(updatedBook);
          }
        } else {
          console.error('Failed to delete chapter');
        }
      };

      const handleEdit = chapter => {
        setEditingChapter(chapter);
      };

      const handleChapterUpdated = async () => {
        const response = await fetch(`/api/books/${bookId}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
        }
        setEditingChapter(null);
      };

      const handleCloseForm = () => {
        setEditingChapter(null);
      };

      return (
        <div>
          <ul className={styles.chapterList}>
            {chapters.map(chapter => (
              <li key={chapter.id} className={styles.chapterItem}>
                <Link href={`/books/${bookId}/chapters/${chapter.id}`}>
                  <span className={styles.chapterTitle}>{chapter.title}</span>
                </Link>
                <div className={styles.chapterActions}>
                  <button className={styles.editButton} onClick={() => handleEdit(chapter)}>
                    Edit
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(chapter.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {editingChapter && (
            <ChapterForm
              bookId={bookId}
              chapter={editingChapter}
              onSave={handleChapterUpdated}
              onClose={handleCloseForm}
            />
          )}
        </div>
      );
    };

    export default ChapterList;
