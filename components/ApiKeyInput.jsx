import React, { useState } from 'react';
    import { useApiKeyStore } from '@/stores/apiKeyStore';
    import styles from './ApiKeyInput.module.css';

    const ApiKeyInput = ({ onSave, onClose }) => {
      const [apiKey, setApiKey] = useState('');
      const setGlobalApiKey = useApiKeyStore(state => state.setApiKey);

      const handleInputChange = event => {
        setApiKey(event.target.value);
      };

      const handleSubmit = () => {
        setGlobalApiKey(apiKey);
        onSave();
      };

      return (
        <div className={styles.formOverlay}>
          <div className={styles.apiKeyInput}>
            <input
              type="text"
              value={apiKey}
              onChange={handleInputChange}
              placeholder="Enter your Gemini API key"
              className={styles.inputField}
            />
            <div className={styles.formButtons}>
              <button onClick={handleSubmit} className={styles.saveButton}>
                Save API Key
              </button>
              <button type="button" onClick={onClose} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    };

    export default ApiKeyInput;
