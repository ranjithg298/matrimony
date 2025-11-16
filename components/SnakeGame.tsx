import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const TILE_SIZE = 20; // in pixels

type Position = { x: number; y: number; };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const SnakeGame: React.FC = () => {
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Position>(getRandomPosition());
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [speed, setSpeed] = useState<number | null>(200);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const gameLoopRef = useRef<number | null>(null);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(getRandomPosition());
        setDirection('RIGHT');
        setSpeed(200);
        setGameOver(false);
        setScore(0);
    };
    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        e.preventDefault();
        switch (e.key) {
            case 'ArrowUp':
                if (direction !== 'DOWN') setDirection('UP');
                break;
            case 'ArrowDown':
                if (direction !== 'UP') setDirection('DOWN');
                break;
            case 'ArrowLeft':
                if (direction !== 'RIGHT') setDirection('LEFT');
                break;
            case 'ArrowRight':
                if (direction !== 'LEFT') setDirection('RIGHT');
                break;
        }
    }, [direction]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    
    const moveSnake = () => {
        if (gameOver) return;

        setSnake(prevSnake => {
            const newSnake = [...prevSnake];
            const head = { ...newSnake[0] };

            switch (direction) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
            }

            // Wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true);
                setSpeed(null);
                return prevSnake;
            }
            
            // Self collision
            for (let i = 1; i < newSnake.length; i++) {
                if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                    setGameOver(true);
                    setSpeed(null);
                    return prevSnake;
                }
            }

            newSnake.unshift(head);

            // Food collision
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10);
                setFood(getRandomPosition());
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    };

    useEffect(() => {
        if (speed !== null && !gameOver) {
            gameLoopRef.current = window.setInterval(moveSnake, speed);
        } else if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);
        }

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [snake, direction, gameOver, speed]);


    return (
        <div className="bg-gray-800 text-white p-4 h-full flex flex-col items-center justify-center font-mono">
            <div className="flex justify-between w-full max-w-[400px] mb-2">
                <span>Score: {score}</span>
                {gameOver && <span className="text-red-500">GAME OVER</span>}
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
                    width: GRID_SIZE * TILE_SIZE,
                    height: GRID_SIZE * TILE_SIZE,
                    border: '2px solid #C0C0C0'
                }}
                className="bg-black relative"
            >
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        className="bg-green-500"
                        style={{ gridColumn: segment.x + 1, gridRow: segment.y + 1 }}
                    />
                ))}
                <div
                    className="bg-red-500 rounded-full"
                    style={{ gridColumn: food.x + 1, gridRow: food.y + 1 }}
                />
            </div>
            {gameOver && (
                 <button onClick={resetGame} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Play Again
                </button>
            )}
            <div className="mt-4 text-xs text-gray-400">Use Arrow Keys to Move</div>
        </div>
    );
};

export default SnakeGame;