import { useRouter } from 'next/router';
    import { useEffect, useState } from 'react';
    import SceneList from '@/components/SceneList';
    import SceneForm from '@/components/SceneForm';
    import styles from './index.module.css';

    const ChapterDetails = () => {
      const router = useRouter();
      const { bookId, chapterId } = router.query;
      const [chapter, setChapter] = useState(null);
      const [showSceneForm, setShowSceneForm] = useState(false);

      useEffect(() => {
        const fetchChapter = async () => {
          const response = await fetch(`/api/books/${bookId}/chapters/${chapterId}`);
          if (response.ok) {
            const data = await response.json();
            const scenesResponse = await fetch(`/api/books/${bookId}/chapters/${chapterId}/scenes`);
            if (scenesResponse.ok) {
              data.scenes = await scenesResponse.json();
            }
            setChapter(data);
          }
        };

        if (bookId && chapterId) {
          fetchChapter();
        }
      }, [bookId, chapterId]);

      const handleSceneCreated = async () => {
        const response = await fetch(`/api/books/${bookId}/chapters/${chapterId}`);
        if (response.ok) {
          const data = await response.json();
          const scenesResponse = await fetch(`/api/books/${bookId}/chapters/${chapterId}/scenes`);
          if (scenesResponse.ok) {
            data.scenes = await scenesResponse.json();
          }
          setChapter(data);
        }
        setShowSceneForm(false);
      };

      const handleCloseSceneForm = () => {
        setShowSceneForm(false);
      };

      if (!chapter) {
        return <div>Loading...</div>;
      }

      return (
        <div>
          <div className={styles.header}>
            <h1>{chapter.title}</h1>
            <button className={styles.createButton} onClick={() => setShowSceneForm(true)}>
              Add Scene
            </button>
          </div>
          <h2>Scenes</h2>
          <SceneList
            bookId={bookId}
            chapterId={chapterId}
            scenes={chapter.scenes}
            setChapter={setChapter}
          />
          {showSceneForm && (
            <SceneForm
              bookId={bookId}
              chapterId={chapterId}
              onSave={handleSceneCreated}
              onClose={handleCloseSceneForm}
            />
          )}
        </div>
      );
    };

    export default ChapterDetails;
