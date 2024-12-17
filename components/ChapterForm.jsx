import React, { useState } from 'react';
    import styles from './ChapterForm.module.css';
    import { generateChapterContent } from '@/utils/gemini';

    const ChapterForm = ({ bookId, chapter, onSave, onClose }) => {
      const [title, setTitle] = useState(chapter?.title || '');

      const handleAiFill = async () => {
        try {
          const generatedContent = await generateChapterContent(bookId, title);
          setTitle(generatedContent.title);
        } catch (error) {
          console.error('Error generating content with AI', error);
          alert('Failed to generate content with AI. Please check your API key and try again.');
        }
      };

      const handleSubmit = async event => {
        event.preventDefault();
        const updatedChapter = { title };
        const method = chapter ? 'PUT' : 'POST';
        const url = chapter
          ? `/api/books/${bookId}/chapters/${chapter.id}`
          : `/api/books/${bookId}/chapters`;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedChapter),
        });

        if (response.ok) {
          onSave();
        } else {
          console.error('Failed to save chapter');
        }
      };

      return (
        <div className={styles.formOverlay}>
          <form className={styles.chapterForm} onSubmit={handleSubmit}>
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

    export default ChapterForm;
