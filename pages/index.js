import React, { useEffect, useState } from 'react';
    import BookList from '@/components/BookList';
    import ApiKeyInput from '@/components/ApiKeyInput';
    import { useApiKeyStore } from '@/stores/apiKeyStore';
    import BookForm from '@/components/BookForm';
    import styles from './index.module.css';

    const Dashboard = () => {
      const apiKey = useApiKeyStore(state => state.apiKey);
      const setApiKey = useApiKeyStore(state => state.setApiKey);
      const [books, setBooks] = useState([]);
      const [showBookForm, setShowBookForm] = useState(false);
      const [showApiKeyInput, setShowApiKeyInput] = useState(false);

      useEffect(() => {
        const fetchBooks = async () => {
          const response = await fetch('/api/books');
          if (response.ok) {
            const data = await response.json();
            setBooks(data);
          }
        };

        fetchBooks();
      }, []);

      const handleBookCreated = async () => {
        const response = await fetch('/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
        setShowBookForm(false);
      };

      const handleCloseForm = () => {
        setShowBookForm(false);
      };

      const handleChangeApiKey = () => {
        setShowApiKeyInput(true);
      };

      const handleApiKeySaved = () => {
        setShowApiKeyInput(false);
      };

      const handleApiKeyClose = () => {
        setShowApiKeyInput(false);
      };

      return (
        <div>
          <div className={styles.header}>
            <h1>Dashboard</h1>
            <div>
              <button className={styles.createButton} onClick={() => setShowBookForm(true)}>
                Create Book
              </button>
              <button className={styles.apiKeyButton} onClick={handleChangeApiKey}>
                Change API Key
              </button>
            </div>
          </div>
          <div className={styles.apiKeyDisplay}>
            Current API Key: {apiKey ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` : 'Not set'}
          </div>
          <BookList books={books} setBooks={setBooks} />
          {showBookForm && <BookForm onSave={handleBookCreated} onClose={handleCloseForm} />}
          {showApiKeyInput && <ApiKeyInput onSave={handleApiKeySaved} onClose={handleApiKeyClose} />}
        </div>
      );
    };

    export default Dashboard;
