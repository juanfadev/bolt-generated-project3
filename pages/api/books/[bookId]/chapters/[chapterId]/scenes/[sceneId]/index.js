import {
      getScene,
      updateScene,
      deleteScene,
    } from '@/utils/db';

    export default async function handler(req, res) {
      const { bookId, chapterId, sceneId } = req.query;

      if (req.method === 'GET') {
        try {
          const scene = await getScene(sceneId);
          if (scene) {
            res.status(200).json(scene);
          } else {
            res.status(404).json({ message: 'Scene not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error retrieving scene', error });
        }
      } else if (req.method === 'PUT') {
        try {
          const { content } = req.body;
          await updateScene(sceneId, content);
          res.status(200).json({ message: 'Scene updated successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error updating scene', error });
        }
      } else if (req.method === 'DELETE') {
        try {
          await deleteScene(sceneId);
          res.status(200).json({ message: 'Scene deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting scene', error });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
