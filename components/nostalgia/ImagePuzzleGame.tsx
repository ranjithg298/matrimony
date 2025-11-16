import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NOSTALGIA_PUZZLE_IMAGES } from '../../constants';

interface ImagePuzzleGameProps {
    imageName?: string;
}

const GRID_SIZE = 3;

interface Piece {
    id: number;
    originalIndex: number;
    style: React.CSSProperties;
}

const shuffle = (array: Piece[]): Piece[] => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const ImagePuzzleGame: React.FC<ImagePuzzleGameProps> = ({ imageName }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(imageName ? NOSTALGIA_PUZZLE_IMAGES[imageName as keyof typeof NOSTALGIA_PUZZLE_IMAGES] : null);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const createPieces = useCallback(() => {
        if (!imageSrc || !containerSize.width) return;
        const newPieces = [];
        const pieceSize = {
            width: containerSize.width / GRID_SIZE,
            height: containerSize.height / GRID_SIZE,
        };
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const row = Math.floor(i / GRID_SIZE);
            const col = i % GRID_SIZE;
            newPieces.push({
                id: i,
                originalIndex: i,
                style: {
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: `${containerSize.width}px ${containerSize.height}px`,
                    backgroundPosition: `-${col * pieceSize.width}px -${row * pieceSize.height}px`,
                    width: `${pieceSize.width}px`,
                    height: `${pieceSize.height}px`,
                },
            });
        }
        setPieces(shuffle(newPieces));
        setIsComplete(false);
    }, [imageSrc, containerSize]);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const { clientWidth } = containerRef.current;
                const size = Math.min(clientWidth, 500);
                setContainerSize({ width: size, height: size });
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        createPieces();
    }, [createPieces]);
    
    useEffect(() => {
        const checkCompletion = () => {
            if (pieces.length === 0) return;
            for (let i = 0; i < pieces.length; i++) {
                if (pieces[i].originalIndex !== i) {
                    setIsComplete(false);
                    return;
                }
            }
            setIsComplete(true);
        };
        checkCompletion();
    }, [pieces]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData("pieceIndex", index.toString());
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
        const dragIndex = parseInt(e.dataTransfer.getData("pieceIndex"));
        const newPieces = [...pieces];
        [newPieces[dragIndex], newPieces[dropIndex]] = [newPieces[dropIndex], newPieces[dragIndex]];
        setPieces(newPieces);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="nostalgia-hub-dark min-h-screen">
            <div className="container mx-auto px-6 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Jigsaw Puzzle</h1>
                <p className="text-theme-text-secondary mb-8 max-w-2xl mx-auto">
                    Drag and drop the pieces to solve the puzzle! Or upload your own image to create a new one.
                </p>

                <div ref={containerRef} className="max-w-[500px] mx-auto mb-4">
                    {imageSrc ? (
                        <div
                            className="grid border-2 border-theme-accent-primary relative"
                            style={{
                                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                                width: containerSize.width,
                                height: containerSize.height,
                            }}
                        >
                            {pieces.map((piece, index) => (
                                <div
                                    key={piece.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleDrop(e, index)}
                                    style={piece.style}
                                    className="cursor-move border border-black/20"
                                />
                            ))}
                            {isComplete && (
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold text-green-400">You Win! 🎉</h2>
                                        <button onClick={createPieces} className="mt-4 bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg">Play Again</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full aspect-square bg-gray-800 flex items-center justify-center rounded-lg">
                            <p>Upload an image to start</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={createPieces} disabled={!imageSrc} className="bg-theme-surface text-theme-text-primary font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50">
                        Shuffle
                    </button>
                    <label className="bg-theme-accent-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition cursor-pointer">
                        Upload Image
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ImagePuzzleGame;