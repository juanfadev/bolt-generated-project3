import { getBook, getChapters, getCharacters, updateBook, deleteBook } from '@/utils/db';

    export default async function handler(req, res) {
      const { bookId } = req.query;

      if (req.method === 'GET') {
        try {
          const book = await getBook(bookId);
          if (book) {
            const chapters = await getChapters(bookId);
            const characters = await getCharacters(bookId);
            res.status(200).json({ ...book, chapters, characters });
          } else {
            res.status(404).json({ message: 'Book not found' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error retrieving book', error });
        }
      } else if (req.method === 'PUT') {
        try {
          const { title, synopsis } = req.body;
          await updateBook(bookId, title, synopsis);
          res.status(200).json({ message: 'Book updated successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error updating book', error });
        }
      } else if (req.method === 'DELETE') {
        try {
          await deleteBook(bookId);
          res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting book', error });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
