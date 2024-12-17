import React, { useState } from 'react';
    import Link from 'next/link';
    import styles from './CharacterList.module.css';
    import CharacterForm from './CharacterForm';

    const CharacterList = ({ bookId, characters, setBook }) => {
      const [editingCharacter, setEditingCharacter] = useState(null);

      const handleDelete = async characterId => {
        const response = await fetch(`/api/books/${bookId}/characters/${characterId}`, {
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
          console.error('Failed to delete character');
        }
      };

      const handleEdit = character => {
        setEditingCharacter(character);
      };

      const handleCharacterUpdated = async () => {
        const response = await fetch(`/api/books/${bookId}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
        }
        setEditingCharacter(null);
      };

      const handleCloseForm = () => {
        setEditingCharacter(null);
      };

      return (
        <div>
          <ul className={styles.characterList}>
            {characters.map(character => (
              <li key={character.id} className={styles.characterItem}>
                <Link href={`/books/${bookId}/characters/${character.id}`}>
                  <span className={styles.characterName}>{character.name}</span>
                </Link>
                <div className={styles.characterActions}>
                  <button className={styles.editButton} onClick={() => handleEdit(character)}>
                    Edit
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(character.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {editingCharacter && (
            <CharacterForm
              bookId={bookId}
              character={editingCharacter}
              onSave={handleCharacterUpdated}
              onClose={handleCloseForm}
            />
          )}
        </div>
      );
    };

    export default CharacterList;
