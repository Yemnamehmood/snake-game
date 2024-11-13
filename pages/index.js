'use client';

import { useState, useEffect, useRef } from 'react';

const CELL_SIZE = 20;
const BOARD_SIZE = 400;

function SnakeGame() {
    const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
    const [food, setFood] = useState({ x: 10, y: 10 });
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const gameLoop = useRef(null);

    // Audio references initialized to null
    const [startSound, setStartSound] = useState(null);
    const [loseSound, setLoseSound] = useState(null);
    const [eatSound, setEatSound] = useState(null);

    // Start the game and play the start sound
    const startGame = () => {
        setSnake([{ x: 5, y: 5 }]);
        setFood(generateFoodPosition());
        setDirection({ x: 0, y: -1 });
        setScore(0);
        setIsPlaying(true);
        if (startSound) startSound.play(); // Play the start sound
    };

    // Stop the game and play the lose sound
    const stopGame = () => {
        setIsPlaying(false);
        clearInterval(gameLoop.current);
        if (loseSound) loseSound.play(); // Play the lose sound
    };

    // Generate random position for food
    const generateFoodPosition = () => ({
        x: Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)),
        y: Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)),
    });

    // Move the snake and check for collisions
    const moveSnake = () => {
        setSnake((prevSnake) => {
            const newSnake = [...prevSnake];
            const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

            // End game if snake hits wall or itself
            if (
                head.x < 0 || head.x >= BOARD_SIZE / CELL_SIZE ||
                head.y < 0 || head.y >= BOARD_SIZE / CELL_SIZE ||
                newSnake.some(segment => segment.x === head.x && segment.y === head.y)
            ) {
                stopGame();
                return prevSnake;
            }

            // Move snake and check for food collision
            newSnake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                setScore((prevScore) => prevScore + 1);
                setFood(generateFoodPosition());
                if (eatSound) eatSound.play(); // Play the eating sound
            } else {
                newSnake.pop();
            }
            return newSnake;
        });
    };

    const handleKeyPress = (event) => {
        switch (event.key) {
            case "ArrowUp":
                if (direction.y === 0) setDirection({ x: 0, y: -1 });
                break;
            case "ArrowDown":
                if (direction.y === 0) setDirection({ x: 0, y: 1 });
                break;
            case "ArrowLeft":
                if (direction.x === 0) setDirection({ x: -1, y: 0 });
                break;
            case "ArrowRight":
                if (direction.x === 0) setDirection({ x: 1, y: 0 });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize audio objects only on the client side
            setStartSound(new Audio('/game-start-6104.mp3'));
            setLoseSound(new Audio('/brass-fail-8-a-207130.mp3'));
            setEatSound(new Audio('/snake-hiss-95241.mp3'));
        }

        if (isPlaying) {
            gameLoop.current = setInterval(moveSnake, 100);
            return () => clearInterval(gameLoop.current);
        }
    }, [isPlaying, direction]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [direction]);

    return (
        <div className="container">
            <h1>Snake Game</h1>
            <div className="score">Score: {score}</div>
            <div className="board" style={{ width: BOARD_SIZE, height: BOARD_SIZE }}>
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        className="snake"
                        style={{
                            left: `${segment.x * CELL_SIZE}px`,
                            top: `${segment.y * CELL_SIZE}px`,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                        }}
                    />
                ))}
                <div
                    className="food"
                    style={{
                        left: `${food.x * CELL_SIZE}px`,
                        top: `${food.y * CELL_SIZE}px`,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                    }}
                />
            </div>
            <div className="controls">
                {!isPlaying ? (
                    <button onClick={startGame}>Start Game</button>
                ) : (
                    <button onClick={stopGame}>Stop Game</button>
                )}
                <button onClick={startGame}>Reset Game</button>
            </div>
            <footer className="footer">© Snake Game by Yemna Mehmood</footer>
        </div>
    );
}

export default SnakeGame;
