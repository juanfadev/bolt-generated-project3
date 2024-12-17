import React, { useState } from 'react';
    import styles from './CharacterForm.module.css';
    import { generateCharacterContent } from '@/utils/gemini';

    const CharacterForm = ({ bookId, character, onSave, onClose }) => {
      const [name, setName] = useState(character?.name || '');
      const [profile, setProfile] = useState(character?.profile || '');

      const handleAiFill = async () => {
        try {
          const generatedContent = await generateCharacterContent(bookId, name, profile);
          setName(generatedContent.name);
          setProfile(generatedContent.profile);
        } catch (error) {
          console.error('Error generating content with AI', error);
          alert('Failed to generate content with AI. Please check your API key and try again.');
        }
      };

      const handleSubmit = async event => {
        event.preventDefault();
        const updatedCharacter = { name, profile };
        const method = character ? 'PUT' : 'POST';
        const url = character
          ? `/api/books/${bookId}/characters/${character.id}`
          : `/api/books/${bookId}/characters`;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCharacter),
        });

        if (response.ok) {
          onSave();
        } else {
          console.error('Failed to save character');
        }
      };

      return (
        <div className={styles.formOverlay}>
          <form className={styles.characterForm} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <label htmlFor="name">Name:</label>
              <button type="button" className={styles.aiButton} onClick={handleAiFill}>
                ✨
              </button>
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />

            <label htmlFor="profile">Profile:</label>
            <textarea
              id="profile"
              value={profile}
              onChange={e => setProfile(e.target.value)}
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

    export default CharacterForm;
