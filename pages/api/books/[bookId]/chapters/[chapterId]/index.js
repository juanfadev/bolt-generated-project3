import {
      getChapter,
      updateChapter,
      deleteChapter,
    } from '@/utils/db';

    export default async function handler(req, res) {
      const { bookId, chapterId } = req.query;

      if (req.method === 'GET') {
        try {
          const chapter = await getChapter(chapterId);
          if (chapter) {
            res.status(200).json(chapter);
          } else {
            res.status(404).json({ message: 'Chapter not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error retrieving chapter', error });
        }
      } else if (req.method === 'PUT') {
        try {
          const { title } = req.body;
          await updateChapter(chapterId, title);
          res.status(200).json({ message: 'Chapter updated successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error updating chapter', error });
        }
      } else if (req.method === 'DELETE') {
        try {
          await deleteChapter(chapterId);
          res.status(200).json({ message: 'Chapter deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting chapter', error });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
