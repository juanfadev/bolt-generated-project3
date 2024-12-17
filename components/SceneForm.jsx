import React, { useState } from 'react';
    import styles from './SceneForm.module.css';
    import { generateSceneContent } from '@/utils/gemini';

    const SceneForm = ({ bookId, chapterId, scene, onSave, onClose }) => {
      const [content, setContent] = useState(scene?.content || '');

      const handleAiFill = async () => {
        try {
          const generatedContent = await generateSceneContent(bookId, chapterId, content);
          setContent(generatedContent.content);
        } catch (error) {
          console.error('Error generating content with AI', error);
          alert('Failed to generate content with AI. Please check your API key and try again.');
        }
      };

      const handleSubmit = async event => {
        event.preventDefault();
        const updatedScene = { content };
        const method = scene ? 'PUT' : 'POST';
        const url = scene
          ? `/api/books/${bookId}/chapters/${chapterId}/scenes/${scene.id}`
          : `/api/books/${bookId}/chapters/${chapterId}/scenes`;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedScene),
        });

        if (response.ok) {
          onSave();
        } else {
          console.error('Failed to save scene');
        }
      };

      return (
        <div className={styles.formOverlay}>
          <form className={styles.sceneForm} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <label htmlFor="content">Content:</label>
              <button type="button" className={styles.aiButton} onClick={handleAiFill}>
                ✨
              </button>
            </div>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
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

    export default SceneForm;
