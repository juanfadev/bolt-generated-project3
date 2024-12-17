import { useRouter } from 'next/router';
    import { useEffect, useState } from 'react';
    import ChapterList from '@/components/ChapterList';
    import CharacterList from '@/components/CharacterList';
    import AgentInteractionPanel from '@/components/AgentInteractionPanel';
    import ChapterForm from '@/components/ChapterForm';
    import CharacterForm from '@/components/CharacterForm';
    import styles from './index.module.css';

    const BookDetails = () => {
      const router = useRouter();
      const { bookId } = router.query;
      const [book, setBook] = useState(null);
      const [showChapterForm, setShowChapterForm] = useState(false);
      const [showCharacterForm, setShowCharacterForm] = useState(false);

      useEffect(() => {
        const fetchBook = async () => {
          const response = await fetch(`/api/books/${bookId}`);
          if (response.ok) {
            const data = await response.json();
            setBook(data);
          }
        };

        if (bookId) {
          fetchBook();
        }
      }, [bookId]);

      const handleChapterCreated = async () => {
        const response = await fetch(`/api/books/${bookId}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
        }
        setShowChapterForm(false);
      };

      const handleCharacterCreated = async () => {
        const response = await fetch(`/api/books/${bookId}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
        }
        setShowCharacterForm(false);
      };

      const handleCloseChapterForm = () => {
        setShowChapterForm(false);
      };

      const handleCloseCharacterForm = () => {
        setShowCharacterForm(false);
      };

      if (!book) {
        return <div>Loading...</div>;
      }

      return (
        <div>
          <div className={styles.header}>
            <h1>{book.title}</h1>
            <button className={styles.createButton} onClick={() => setShowChapterForm(true)}>
              Add Chapter
            </button>
            <button className={styles.createButton} onClick={() => setShowCharacterForm(true)}>
              Add Character
            </button>
          </div>
          <p>{book.synopsis}</p>
          <h2>Chapters</h2>
          <ChapterList bookId={bookId} chapters={book.chapters} setBook={setBook} />
          <h2>Characters</h2>
          <CharacterList bookId={bookId} characters={book.characters} setBook={setBook} />
          <AgentInteractionPanel />

          {showChapterForm && (
            <ChapterForm bookId={bookId} onSave={handleChapterCreated} onClose={handleCloseChapterForm} />
          )}
          {showCharacterForm && (
            <CharacterForm
              bookId={bookId}
              onSave={handleCharacterCreated}
              onClose={handleCloseCharacterForm}
            />
          )}
        </div>
      );
    };

    export default BookDetails;
