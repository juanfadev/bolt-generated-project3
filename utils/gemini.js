import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
    import { useApiKeyStore } from '@/stores/apiKeyStore';

    const getGeminiModel = () => {
      const apiKey = useApiKeyStore.getState().apiKey;
      if (!apiKey) {
        throw new Error('API key not set.');
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    };

    const generateStructuredContent = async (prompt, schema) => {
      const model = getGeminiModel();
      const generationConfig = {
        temperature: 0.9,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
        responseSchema: schema, // Pass the schema object directly
      };

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig,
      });

      const response = result.response;
      try {
        const text = response.text();
        return JSON.parse(text);
      } catch (error) {
        console.error('Failed to parse JSON response:', error);
        console.log('Raw response text:', response.text());
        throw new Error('Invalid JSON response from AI');
      }
    };

    // Schemas for different content types
    const bookSchema = {
      type: SchemaType.OBJECT,
      properties: {
        title: {
          type: SchemaType.STRING,
          description: 'Title of the book',
        },
        synopsis: {
          type: SchemaType.STRING,
          description: 'Synopsis of the book',
        },
      },
      required: ['title', 'synopsis'],
    };

    const chapterSchema = {
      type: SchemaType.OBJECT,
      properties: {
        title: {
          type: SchemaType.STRING,
          description: 'Title of the chapter',
        },
      },
      required: ['title'],
    };

    const sceneSchema = {
      type: SchemaType.OBJECT,
      properties: {
        content: {
          type: SchemaType.STRING,
          description: 'Content of the scene',
        },
      },
      required: ['content'],
    };

    const characterSchema = {
      type: SchemaType.OBJECT,
      properties: {
        name: {
          type: SchemaType.STRING,
          description: 'Name of the character',
        },
        profile: {
          type: SchemaType.STRING,
          description: 'Profile of the character',
        },
      },
      required: ['name', 'profile'],
    };

    // Agent interaction functions
    export const architectAgent = async bookSynopsis => {
      const prompt = `Generate an outline for a book based on this synopsis: ${bookSynopsis}`;
      return generateStructuredContent(prompt, bookSchema);
    };

    export const wordsmithAgent = async sceneOutline => {
      const prompt = `Write a scene based on this outline: ${sceneOutline}`;
      return generateStructuredContent(prompt, sceneSchema);
    };

    export const characterDeveloperAgent = async characterTraits => {
      const prompt = `Develop a character based on these traits: ${characterTraits}`;
      return generateStructuredContent(prompt, characterSchema);
    };

    export const criticAgent = async text => {
      const prompt = `Provide feedback on this text: ${text}`;
      return generateContent(prompt); // Critic agent doesn't need structured output
    };

    export const researcherAgent = async query => {
      const prompt = `Research: ${query}`;
      return generateContent(prompt); // Researcher agent doesn't need structured output
    };

    // Functions for AI-assisted form filling
    export const generateBookContent = async (title, synopsis) => {
      const prompt =
        title || synopsis
          ? `Generate a book title and synopsis based on: Title: ${title}, Synopsis: ${synopsis}`
          : 'Generate a random book title and synopsis';
      return generateStructuredContent(prompt, bookSchema);
    };

    export const generateChapterContent = async (bookId, title) => {
      const prompt = title
        ? `Generate a chapter title based on: ${title}`
        : `Generate a random chapter title for bookId ${bookId}`;
      return generateStructuredContent(prompt, chapterSchema);
    };

    export const generateSceneContent = async (bookId, chapterId, content) => {
      const prompt = content
        ? `Generate scene content based on: ${content}`
        : `Generate random scene content for bookId ${bookId} and chapterId ${chapterId}`;
      return generateStructuredContent(prompt, sceneSchema);
    };

    export const generateCharacterContent = async (bookId, name, profile) => {
      const prompt =
        name || profile
          ? `Generate a character name and profile based on: Name: ${name}, Profile: ${profile}`
          : `Generate a random character name and profile for bookId ${bookId}`;
      return generateStructuredContent(prompt, characterSchema);
    };
