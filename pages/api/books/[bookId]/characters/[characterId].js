import {
      getCharacter,
      updateCharacter,
      deleteCharacter,
    } from '@/utils/db';

    export default async function handler(req, res) {
      const { bookId, characterId } = req.query;

      if (req.method === 'GET') {
        try {
          const character = await getCharacter(characterId);
          if (character) {
            res.status(200).json(character);
          } else {
            res.status(404).json({ message: 'Character not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error retrieving character', error });
        }
      } else if (req.method === 'PUT') {
        try {
          const { name, profile } = req.body;
          await updateCharacter(characterId, name, profile);
          res.status(200).json({ message: 'Character updated successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error updating character', error });
        }
      } else if (req.method === 'DELETE') {
        try {
          await deleteCharacter(characterId);
          res.status(200).json({ message: 'Character deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting character', error });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
