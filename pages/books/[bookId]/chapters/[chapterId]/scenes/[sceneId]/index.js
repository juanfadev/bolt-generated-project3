import { useRouter } from 'next/router';
    import { useEffect, useState } from 'react';

    const SceneDetails = () => {
      const router = useRouter();
      const { bookId, chapterId, sceneId } = router.query;
      const [scene, setScene] = useState(null);

      useEffect(() => {
        const fetchScene = async () => {
          const response = await fetch(`/api/books/${bookId}/chapters/${chapterId}/scenes/${sceneId}`);
          if (response.ok) {
            const data = await response.json();
            setScene(data);
          }
        };

        if (bookId && chapterId && sceneId) {
          fetchScene();
        }
      }, [bookId, chapterId, sceneId]);

      if (!scene) {
        return <div>Loading...</div>;
      }

      return (
        <div>
          <h1>Scene {sceneId}</h1>
          <p>{scene.content}</p>
        </div>
      );
    };

    export default SceneDetails;
