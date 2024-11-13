# Snake Game

A simple Snake Game built using React and Next.js. The game features basic functionality, including snake movement, food collection, and score tracking. It also plays sound effects when the game starts, when the snake eats food, and when the game is lost.

## Features

- **Snake Movement**: Control the snake using the arrow keys (Up, Down, Left, Right).
- **Food Collection**: The snake eats food to grow and increase the score.
- **Audio Effects**: Sound effects are triggered when the game starts, the snake eats food, and the game ends.
- **Score Tracker**: Tracks and displays the player’s score based on the number of food items eaten.
- **Responsive Layout**: The game board and interface are styled to work across different screen sizes.

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/snake-game.git
```

### 2. Navigate into the project directory:

```bash
cd snake-game
```

### 3. Install dependencies:

```bash
npm install
```

### 4. Run the development server:

```bash
npm run dev
```

This will start the app on [http://localhost:3000](http://localhost:3000).

## Game Controls

- **Arrow Keys (Up, Down, Left, Right)**: Control the snake's movement.
- **Start Game Button**: Starts a new game.
- **Stop Game Button**: Stops the current game.
- **Reset Game Button**: Resets the game after it’s stopped.

## Project Structure

- `pages/index.js`: Main game logic and UI.
- `styles/globals.css`: Global styles for the project.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: Library for building the user interface.
- **CSS**: Styling for the game board and UI elements.

## Audio Files

- `game-start-6104.mp3`: Played when the game starts.
- `brass-fail-8-a-207130.mp3`: Played when the game ends.
- `snake-hiss-95241.mp3`: Played when the snake eats food.

