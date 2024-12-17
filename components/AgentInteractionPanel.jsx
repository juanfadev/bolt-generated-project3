import React, { useState } from 'react';
    import {
      architectAgent,
      wordsmithAgent,
      characterDeveloperAgent,
      criticAgent,
      researcherAgent,
    } from '@/utils/gemini';
    import styles from './AgentInteractionPanel.module.css';

    const AgentInteractionPanel = () => {
      const [agentResponse, setAgentResponse] = useState('');

      const handleArchitectClick = async () => {
        const response = await architectAgent('A young mage discovers a hidden power.');
        setAgentResponse(response);
      };

      const handleWordsmithClick = async () => {
        const response = await wordsmithAgent('Elara is practicing magic in the forest.');
        setAgentResponse(response);
      };

      const handleCharacterDeveloperClick = async () => {
        const response = await characterDeveloperAgent('Curious, determined, a bit reckless.');
        setAgentResponse(response);
      };

      const handleCriticClick = async () => {
        const response = await criticAgent('Sample scene text.');
        setAgentResponse(response);
      };

      const handleResearcherClick = async () => {
        const response = await researcherAgent('Types of magical energy in fantasy literature.');
        setAgentResponse(response);
      };

      return (
        <div className={styles.agentPanel}>
          <h2 className={styles.agentPanelTitle}>Agent Interaction Panel</h2>
          <div className={styles.agentButtons}>
            <button className={styles.agentButton} onClick={handleArchitectClick}>
              Architect
            </button>
            <button className={styles.agentButton} onClick={handleWordsmithClick}>
              Wordsmith
            </button>
            <button className={styles.agentButton} onClick={handleCharacterDeveloperClick}>
              Character Developer
            </button>
            <button className={styles.agentButton} onClick={handleCriticClick}>
              Critic
            </button>
            <button className={styles.agentButton} onClick={handleResearcherClick}>
              Researcher
            </button>
          </div>
          <div className={styles.agentResponse}>
            <h3 className={styles.agentResponseTitle}>Agent Response:</h3>
            <pre className={styles.agentResponseContent}>{agentResponse}</pre>
          </div>
        </div>
      );
    };

    export default AgentInteractionPanel;
