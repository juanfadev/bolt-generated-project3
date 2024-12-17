import { createScene, getScenes } from '@/utils/db';

    export default async function handler(req, res) {
      const { bookId, chapterId } = req.query;

      if (req.method === 'GET') {
        try {
          const scenes = await getScenes(chapterId);
          res.status(200).json(scenes);
        } catch (error) {
          res.status(500).json({ message: 'Error retrieving scenes', error });
        }
      } else if (req.method === 'POST') {
        try {
          const { content } = req.body;
          const newSceneId = await createScene(chapterId, content);
          res.status(201).json({ id: newSceneId, message: 'Scene created successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error creating scene', error });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
