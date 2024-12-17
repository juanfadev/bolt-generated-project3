import { useRouter } from 'next/router';
    import { useEffect, useState } from 'react';

    const CharacterDetails = () => {
      const router = useRouter();
      const { bookId, characterId } = router.query;
      const [character, setCharacter] = useState(null);

      useEffect(() => {
        const fetchCharacter = async () => {
          const response = await fetch(`/api/books/${bookId}/characters/${characterId}`);
          if (response.ok) {
            const data = await response.json();
            setCharacter(data);
          }
        };

        if (bookId && characterId) {
          fetchCharacter();
        }
      }, [bookId, characterId]);

      if (!character) {
        return <div>Loading...</div>;
      }

      return (
        <div>
          <h1>{character.name}</h1>
          <p>{character.profile}</p>
        </div>
      );
    };

    export default CharacterDetails;
