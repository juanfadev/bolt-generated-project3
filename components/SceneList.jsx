import React, { useState } from 'react';
    import Link from 'next/link';
    import styles from './SceneList.module.css';
    import SceneForm from './SceneForm';

    const SceneList = ({ bookId, chapterId, scenes, setChapter }) => {
      const [editingScene, setEditingScene] = useState(null);

      const handleDelete = async sceneId => {
        const response = await fetch(
          `/api/books/${bookId}/chapters/${chapterId}/scenes/${sceneId}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          // Refresh the chapter data
          const chapterResponse = await fetch(`/api/books/${bookId}/chapters/${chapterId}`);
          if (chapterResponse.ok) {
            const updatedChapter = await chapterResponse.json();
            const scenesResponse = await fetch(
              `/api/books/${bookId}/chapters/${chapterId}/scenes`
            );
            if (scenesResponse.ok) {
              updatedChapter.scenes = await scenesResponse.json();
            }
            setChapter(updatedChapter);
          }
        } else {
          console.error('Failed to delete scene');
        }
      };

      const handleEdit = scene => {
        setEditingScene(scene);
      };

      const handleSceneUpdated = async () => {
        const response = await fetch(`/api/books/${bookId}/chapters/${chapterId}`);
        if (response.ok) {
          const data = await response.json();
          const scenesResponse = await fetch(`/api/books/${bookId}/chapters/${chapterId}/scenes`);
          if (scenesResponse.ok) {
            data.scenes = await scenesResponse.json();
          }
          setChapter(data);
        }
        setEditingScene(null);
      };

      const handleCloseForm = () => {
        setEditingScene(null);
      };

      return (
        <div>
          <ul className={styles.sceneList}>
            {scenes.map(scene => (
              <li key={scene.id} className={styles.sceneItem}>
                <Link href={`/books/${bookId}/chapters/${chapterId}/scenes/${scene.id}`}>
                  <span className={styles.sceneTitle}>Scene {scene.id}</span>
                </Link>
                <div className={styles.sceneActions}>
                  <button className={styles.editButton} onClick={() => handleEdit(scene)}>
                    Edit
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(scene.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {editingScene && (
            <SceneForm
              bookId={bookId}
              chapterId={chapterId}
              scene={editingScene}
              onSave={handleSceneUpdated}
              onClose={handleCloseForm}
            />
          )}
        </div>
      );
    };

    export default SceneList;
