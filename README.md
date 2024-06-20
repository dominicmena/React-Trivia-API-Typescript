# React Typescript API Trivia Game

React code that delivers the product described below.

## Details

This application currently fetches from a publically available api hosted at `https://opentdb.com/`, which serves trivia questions.

### Acceptance Criteria

A user should be able to:

- See instructions for how to play
- Start a fresh trivia game
- Select:
  - a category of questions
  - number of questions
  
## Running the App

`npm install`

`npm run dev`

App will be running on `http://localhost:3001/`


## Trivia Game Application Overview - Dominic Mena

APIClient (client.ts)
Features:

- Initialization: 
Initializes the API base URL and provides methods to fetch trivia categories (getCategories) and questions (getQuestions).
Category Retrieval (getCategories): Retrieves trivia categories using unreliableAxios, ensuring robust error handling and reliable data retrieval.
Error Handling:

- Error Management: 
Implements try-catch blocks to handle errors from API requests using unreliableAxios, with descriptive error messages for clarity.
unreliableAxios (unreliableAxios.ts)
Features:

- Response Handling: Axios interceptor manages response errors, particularly handling 429 Too Many Requests with automatic retries using exponential backoff (MAX_RETRIES, INITIAL_BACKOFF constants).
Error Handling:

- Retry Logic: Automatically retries requests upon encountering rate limits (429 errors), enhancing application resilience during network fluctuations.
Button Component (button.tsx)
Features:

- Styled Components: Utilizes Emotion's styled function to dynamically style buttons based on interaction states (selected, correct, answered).
Visual Feedback: Changes background color to indicate correctness (theme.secondary for correct, theme.error for incorrect) and adjusts text color accordingly (theme.textInverted for selected buttons).
Placeholder Component (placeholder.tsx)
Features:

- Game State Management: Uses React's useState to manage game states (currentQuestionIndex, score, gameFinished, selectedAnswer, correctAnswer, isCorrect, answered).
Dynamic UI Rendering: Conditionally renders game instructions, game-over screen, or trivia questions based on game state (gameStarted, gameFinished).
Answer Handling: Allows only one selection per question (handleAnswer), visually indicating correctness with conditional colors and explicit text feedback.
HomeContainer Component (homecontainer.tsx)
Features:

- State Management: Manages local state with useState for selectedNumberOfQuestions, selectedCategory, and gameStarted.
Data Fetching: Utilizes useQuery from react-query to fetch trivia categories (categories) and questions (questions), providing efficient data retrieval and management.
Event Handling: Implements handlers (handleStartGame, handleRestartGame, handleSelectCategory, handleSelectNumberOfQuestions) for game control, category selection, and number of questions.
Loading Feedback: Displays "Loading..." during category or question retrieval (isLoadingCategories, isLoadingQuestions), ensuring user awareness of ongoing operations.
decodeHtmlEntities Utility (decodeHtmlEntities.ts)
Features:

- Text Processing: Provides a utility function (decodeHtmlEntities) using DOMParser to decode HTML entities in text strings, ensuring accurate rendering of special characters in trivia questions and answers.

Detailed Functionality Overview

Trivia Question Handling: Placeholder component manages game flow and interaction, dynamically rendering questions and handling user responses (handleAnswer, handleNextQuestion).
User Interaction: Button component offers visually differentiated feedback based on user selections (selected, correct, answered), enhancing user experience with clear visual cues.
Game Flow: HomeContainer orchestrates game initialization, category selection, and question retrieval (handleStartGame, handleRestartGame), ensuring seamless gameplay and user engagement.
Error Resilience: Components employ robust error handling and retry mechanisms (unreliableAxios) to manage API communication and maintain application stability.

