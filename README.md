# EcoPrompt

## Overview

EcoPrompt is a web application designed to help individuals understand the environmental impact of their daily actions. By analyzing user inputs, the platform provides insights into carbon footprint, water usage, and waste generation, while suggesting eco-friendly alternatives and improvements.

The goal of EcoPrompt is to encourage users to adopt sustainable practices and make informed choices that contribute to reducing their environmental impact.

## Features

* **User Authentication**: Simple signup and login functionality to store user sessions.
* **Action Impact Analysis**: Users can input actions (e.g., “taking a flight” or “eating meat”), and the system calculates estimated environmental impact.
* **Eco Score**: Each action contributes to an overall eco score, motivating users to make greener choices.
* **Personalized Suggestions**: Provides tailored recommendations to reduce environmental footprint.
* **History Tracking**: Keeps track of previously entered actions for quick reuse.

## Tech Stack

* **Frontend**: HTML, CSS, JavaScript (Axios for API requests)
* **Backend**: Node.js, Express.js
* **Data Handling**: Basic impact estimation logic implemented in backend

## Installation

1. Clone the repository:

   git clone https://github.com/your-repo/ecoprompt.git
   cd ecoprompt   

2. Install dependencies for backend:

   cd backend
   npm install

3. Start the backend server:

   node server.js

4. Open the frontend:

   * Serve `index.html` using a simple live server (VS Code extension or any static server).
   * Ensure backend runs on `http://localhost:5000`.

## Usage

1. Sign up on first visit, then log in on subsequent visits.
2. Enter an action (e.g., “I am taking a flight”).
3. View detailed analysis of carbon footprint, water usage, and waste.
4. Explore eco-friendly alternatives and suggestions.
5. Track previous actions using auto-suggest.

## Team

**Team DScoders**

* **Ayesha Shaikh** – Full Stack Development
* **Sulekha Thakur** – Full Stack Development

## Future Enhancements

* Persistent storage of user data (database integration).
* Enhanced impact models with real-world datasets.
* Gamification with badges and achievement levels.
* Community leaderboard to encourage collective action.

## License

This project is licensed under the MIT License.
