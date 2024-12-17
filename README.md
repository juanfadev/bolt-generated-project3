# Book Writing App

    ## Overview

    This is a web application designed to assist writers in creating and managing their books. It leverages the power of AI through multiple Large Language Model (LLM) agents, each with a specialized role in the writing process. The agents collaborate to help with tasks such as outlining, drafting, character development, editing, and research.

    ## Features

    *   **Multi-Agent Collaboration:** Utilizes a team of AI agents, including an Architect, Wordsmith, Character Developer, Critic, and Researcher, to assist with various aspects of book writing.
    *   **Structured Content Generation:** Employs AI to generate content in a structured JSON format, ensuring consistency and ease of integration.
    *   **CRUD Operations:** Supports Create, Read, Update, and Delete operations for books, chapters, scenes, and characters.
    *   **User-Friendly Interface:** Provides an intuitive UI for managing book projects, interacting with AI agents, and editing content.
    *   **API Key Management:** Allows users to input and manage their own Gemini API key.
    *   **Database Integration:** Stores book data in an SQLite database for persistence.
    *   **Modern Web Technologies:** Built using React, Next.js, and modern CSS styling.

    ## Prerequisites

    *   Node.js (v18 or higher recommended)
    *   npm (v9 or higher recommended)
    *   A Gemini API key

    ## Installation

    1. Clone the repository:

        ```bash
        git clone <repository-url>
        cd book-writing-app
        ```

    2. Install dependencies:

        ```bash
        npm install
        ```

    ## Configuration

    1. **API Key:**
        *   Obtain a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).
        *   In the application, navigate to the Dashboard.
        *   Click the "Change API Key" button.
        *   Enter your API key in the input field and click "Save API Key".

    ## Usage

    1. Start the development server:

        ```bash
        npm run dev
        ```

    2. Open your web browser and go to `http://localhost:3000`.

    3. **Dashboard:**
        *   View existing book projects.
        *   Create new book projects.
        *   Manage your API key.

    4. **Book Details:**
        *   View and edit book title and synopsis.
        *   Manage chapters and characters.
        *   Interact with AI agents through the Agent Interaction Panel.

    5. **Chapter Details:**
        *   View and edit chapter titles.
        *   Manage scenes.

    6. **Scene Details:**
        *   View and edit scene content.

    7. **Character Details:**
        *   View and edit character name and profile.

    8. **AI-Assisted Creation:**
        *   Use the "✨" button on forms to generate content with AI.
        *   Provide existing content as a prompt or leave fields empty for random generation.

    ## Supported LLMs

    See the `llms.txt` file for a list of currently supported Large Language Models.

    ## Makefile

    This project includes a `Makefile` to simplify common tasks. Here are some of the available commands:

    *   `make help`: Shows the available Makefile commands.
    *   `make build`: Builds the application for production.
    *   `make deploy-local`: Deploys the application locally using `npm start`.
    *   `make deploy-vercel`: Deploys the application to Vercel (read-only database due to SQLite limitations).

    ## Deployment

    Since this application uses a file-based SQLite database and doesn't rely on external services (except for the Gemini API), you have a few options for deployment:

    ### Option 1: Local Deployment (Self-Contained)

    1. **Build the application:**

        ```bash
        make build
        ```

    2. **Start the production server:**

        ```bash
        make deploy-local
        ```

    This will run the application locally, serving it from the `out` directory. You can access it in your browser at `http://localhost:3000` (or the port specified by your Next.js configuration).

    **Note:** This approach is suitable for personal use or if you want to run the application on your own machine without relying on external hosting.

    ### Option 2: Vercel (Serverless)

    Vercel is a great platform for deploying Next.js applications. However, since we're using a file-based SQLite database, there's a caveat:

    *   **SQLite Limitations:** SQLite databases are not ideal for serverless environments like Vercel because the filesystem is ephemeral. Any changes made to the database file will be lost when the serverless function scales down.

    **Workaround:**

    1. **Read-Only Database:** You can deploy the application with a pre-populated SQLite database that is read-only. This means users can view the data but cannot make any changes (no CRUD operations that modify the database).
    2. **External Database:** For full CRUD functionality, you would need to use an external database service like:
        *   **PlanetScale:** A serverless MySQL-compatible database.
        *   **Supabase:** A serverless Postgres database.
        *   **Fauna:** A serverless document database.

    **Deployment Steps (Read-Only):**

    1. **Create a Vercel account:** If you don't have one, sign up at [vercel.com](https://vercel.com/).
    2. **Install Vercel CLI:**

        ```bash
        npm install -g vercel
        ```

    3. **Connect to Vercel:**

        ```bash
        vercel login
        ```

    4. **Deploy:**

        ```bash
        make deploy-vercel
        ```

        Follow the prompts to configure your deployment. You might need to set the `Framework Preset` to `Next.js` and the `Output Directory` to `out`.

    **Note:** If you choose to use an external database, you'll need to update the `utils/db.js` file to connect to your chosen database service and modify the API routes accordingly.

    ### Option 3: Other Hosting Providers

    You can deploy the application to other hosting providers that support Node.js applications, such as:

    *   **AWS:** Using services like EC2, Elastic Beanstalk, or Lambda (with an external database).
    *   **Google Cloud:** Using services like Compute Engine, App Engine, or Cloud Run (with an external database).
    *   **Heroku:** A platform-as-a-service that supports Node.js applications.
    *   **DigitalOcean:** A cloud hosting provider with virtual private servers.

    The specific deployment steps will vary depending on the provider you choose. You'll generally need to:

    1. Build the application (`make build`).
    2. Set up a server or environment on the hosting provider.
    3. Transfer the built files and the `package.json` to the server.
    4. Install dependencies (`npm install --production`).
    5. Start the application using `npm start` or a process manager like `pm2`.

    **Important:** Remember to configure environment variables (e.g., for your database connection string if using an external database) on your hosting provider.

    ## Contributing

    Contributions are welcome! Please feel free to submit issues or pull requests.

    ## License

    This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
