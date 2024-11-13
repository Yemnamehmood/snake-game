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
    const generateFoodPosition = () => {
        const x = Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE));
        const y = Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE));

        return { x: x, y: y };
    };

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

                // Ensure food does not overlap with snake body
                let newFoodPosition;
                do {
                    newFoodPosition = generateFoodPosition();
                } while (newSnake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));

                setFood(newFoodPosition);
                if (eatSound) eatSound.play();
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

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        const startX = touch.pageX;
        const startY = touch.pageY;

        const handleTouchMove = (moveEvent) => {
            const moveTouch = moveEvent.touches[0];
            const deltaX = moveTouch.pageX - startX;
            const deltaY = moveTouch.pageY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 0) {
                    setDirection({ x: 1, y: 0 });  // Right swipe
                } else {
                    setDirection({ x: -1, y: 0 });  // Left swipe
                }
            } else {
                // Vertical swipe
                if (deltaY > 0) {
                    setDirection({ x: 0, y: 1 });  // Down swipe
                } else {
                    setDirection({ x: 0, y: -1 });  // Up swipe
                }
            }

            window.removeEventListener("touchmove", handleTouchMove);
        };

        window.addEventListener("touchmove", handleTouchMove, { passive: true });
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
        window.addEventListener("touchstart", handleTouchStart);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("touchstart", handleTouchStart);
        };
    }, [direction]);

    return (
        <div className="container bg-black bg-opacity-80 rounded-lg p-6 text-center">
            <h1 className="text-teal-400 text-2xl mb-4">Snake Game</h1>
            <div className="score text-teal-400 mb-4 text-lg">Score: {score}</div>
            <div className="board relative bg-gray-800 border-2 border-teal-400 rounded-lg"
                style={{ width: BOARD_SIZE, height: BOARD_SIZE }}>
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        className="snake absolute bg-teal-400 rounded-sm"
                        style={{
                            left: `${segment.x * CELL_SIZE}px`,
                            top: `${segment.y * CELL_SIZE}px`,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                        }}
                    />
                ))}
                <div
                    className="food absolute bg-red-500 rounded-full"
                    style={{
                        left: `${food.x * CELL_SIZE}px`,
                        top: `${food.y * CELL_SIZE}px`,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                    }}
                />
            </div>
            <div className="controls mt-4">
                {!isPlaying ? (
                    <button onClick={startGame} className="bg-teal-400 text-black py-2 px-4 rounded-md">
                        Start Game
                    </button>
                ) : (
                    <button onClick={stopGame} className="bg-red-500 text-black py-2 px-4 rounded-md">
                        Stop Game
                    </button>
                )}
                <button onClick={startGame} className="bg-teal-400 text-black py-2 px-4 rounded-md ml-2">
                    Reset Game
                </button>
            </div>
            <footer className="footer text-white text-sm mt-4">© Snake Game by Yemna Mehmood</footer>
        </div>
    );
}

export default SnakeGame;
