import { createBook, getBooks } from '@/utils/db';

    export default async function handler(req, res) {
      if (req.method === 'GET') {
        try {
          const books = await getBooks();
          res.status(200).json(books);
        } catch (error) {
          res.status(500).json({ message: 'Error retrieving books', error });
        }
      } else if (req.method === 'POST') {
        try {
          const { title, synopsis } = req.body;
          const newBookId = await createBook(title, synopsis);
          res.status(201).json({ id: newBookId, message: 'Book created successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error creating book', error });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
