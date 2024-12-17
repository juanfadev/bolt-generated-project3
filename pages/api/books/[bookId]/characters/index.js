import { createCharacter, getCharacters } from '@/utils/db';

    export default async function handler(req, res) {
      const { bookId } = req.query;

      if (req.method === 'GET') {
        try {
          const characters = await getCharacters(bookId);
          res.status(200).json(characters);
        } catch (error) {
          res.status(500).json({ message: 'Error retrieving characters', error });
        }
      } else if (req.method === 'POST') {
        try {
          const { name, profile } = req.body;
          const newCharacterId = await createCharacter(bookId, name, profile);
          res.status(201).json({ id: newCharacterId, message: 'Character created successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error creating character', error });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
