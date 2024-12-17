import { createChapter, getChapters } from '@/utils/db';

    export default async function handler(req, res) {
      const { bookId } = req.query;

      if (req.method === 'GET') {
        try {
          const chapters = await getChapters(bookId);
          res.status(200).json(chapters);
        } catch (error) {
          res.status(500).json({ message: 'Error retrieving chapters', error });
        }
      } else if (req.method === 'POST') {
        try {
          const { title } = req.body;
          const newChapterId = await createChapter(bookId, title);
          res.status(201).json({ id: newChapterId, message: 'Chapter created successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error creating chapter', error });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
