window.onload = function() {
    renderRandomDots();
};


const mazeGrid = 
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,2,0,0,0,1,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,2,0,0,0,1,0,0,1,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,0,0,3,3,3,3,3,0,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0],
        [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
        [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
        [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

const dotContainer = document.getElementById("dot-container");
const cellSize = 18;
const dotSize = 4;
const powerPelletSize = 15; // Larger size for power pellets
const POWER_PELLETS_COUNT = 4;
const POWER_PELLET_POINTS = 50; // Points for power pellets

function getRandomDotPercentage() {
    return 100
   // return Math.random() * (85 - 75) + 75;
}

function countPossibleDotPositions() {
    return mazeGrid.flat().filter(cell => cell === 1).length;
}

function renderRandomDots() {
    dotContainer.innerHTML = '';
    
    const totalPossibleDots = countPossibleDotPositions();
    const percentageToShow = getRandomDotPercentage();
    const numberOfDotsToShow = Math.floor(totalPossibleDots * (percentageToShow / 100));
    
    // Create array of all possible positions
    const allPositions = [];
    mazeGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 1) {
                allPositions.push({ row: rowIndex, col: colIndex });
            }
        });
    });
    
   // Define power pellet positions
const powerPelletPositions = [
    { row: 3, col: 1 },   // Top left
    { row: 3, col: 26 },  // Top right
    { row: 23, col: 1 },  // Bottom left
    { row: 23, col: 26 }  // Bottom right
  ];
  
  // Remove these pellets from available positions for regular dots
  const fixedPelletPositionsToRemove = [];
  powerPelletPositions.forEach(pos => {
    const indexToRemove = allPositions.findIndex(p => 
      p.row === pos.row && p.col === pos.col
    );
    if (indexToRemove !== -1) {
      allPositions.splice(indexToRemove, 1);
    }
  });
  
    // Then select positions for regular dots
    const regularDotPositions = [];
    const dotsNeeded = numberOfDotsToShow - POWER_PELLETS_COUNT;
    while (regularDotPositions.length < dotsNeeded) {
        const randomIndex = Math.floor(Math.random() * allPositions.length);
        const position = allPositions.splice(randomIndex, 1)[0];
        regularDotPositions.push(position);
    }
    
    // Create regular dots
    regularDotPositions.forEach(pos => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.dataset.points = "10";
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.position = "absolute";
        dot.style.backgroundColor = "yellow";
       // dot.style.borderRadius = "50%";
        dot.style.top = `${pos.row * cellSize + cellSize / 2 - dotSize / 2}px`;
        dot.style.left = `${pos.col * cellSize + cellSize / 2 - dotSize / 2}px`;
        dotContainer.appendChild(dot);
    });
    
    // Create power pellets
    powerPelletPositions.forEach(pos => {
        const powerPellet = document.createElement("div");
        powerPellet.classList.add("dot", "power-pellet");
        powerPellet.dataset.points = POWER_PELLET_POINTS.toString();
        powerPellet.style.width = `${powerPelletSize}px`;
        powerPellet.style.height = `${powerPelletSize}px`;
        powerPellet.style.position = "absolute";
        powerPellet.style.backgroundSize = "cover";
        powerPellet.style.top = `${pos.row * cellSize + cellSize / 2 - powerPelletSize / 2}px`;
        powerPellet.style.left = `${pos.col * cellSize + cellSize / 2 - powerPelletSize / 2}px`;
        powerPellet.style.backgroundImage = "url('assets/sprites/powerPellet.svg')";
        dotContainer.appendChild(powerPellet);
    });
    
    // Store game state information
    window.gameState = {
        totalDots: numberOfDotsToShow,
        dotsRemaining: numberOfDotsToShow,
        dotPercentage: percentageToShow.toFixed(1),
        powerPelletsRemaining: POWER_PELLETS_COUNT,
        maxPossibleScore: (dotsNeeded * 10) + (POWER_PELLETS_COUNT * POWER_PELLET_POINTS),
        gameOver: true,
    };
    
    console.log(`Generated ${dotsNeeded} regular dots and ${POWER_PELLETS_COUNT} power pellets (${percentageToShow.toFixed(1)}% of ${totalPossibleDots} possible positions)`);
    return numberOfDotsToShow;
}

function getGameState() {
    return window.gameState;
}

function collectDot(dotElement) {
    if (dotElement && dotElement.classList.contains('dot')) {
        const points = parseInt(dotElement.dataset.points) || 10;
        window.gameState.dotsRemaining--;
        
        if (dotElement.classList.contains('power-pellet')) {
            window.gameState.powerPelletsRemaining--;
            // You can trigger ghost vulnerability here
            document.dispatchEvent(new CustomEvent('powerPelletCollected'));
        }
        
        dotElement.remove();
        return points;
    }
    return 0;
}

function areAllDotsCollected() {
    return window.gameState.dotsRemaining === 0;
}

function resetDots() {
    return renderRandomDots();
}

// CSS 
const style = document.createElement('style');
style.textContent = `
@keyframes powerPelletPulse {
    0% { transform: scale(1); }
    50% { transform: scale(0.8); }
    100% { transform: scale(1); }
}
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
    const pacman = document.getElementById("pacman");
    if (!pacman) {
        console.error("Pacman element not found!");
        return;
    }

    // Configuration constants - adjust these for fine-tuning
    const CELL_SIZE = 18;
    const POSITION_OFFSET = {
        x: 8,  // Adjust if Pac-Man needs to shift left/right
        y: -7   // Adjust if Pac-Man needs to shift up/down
    };
    const GRID_SNAP_THRESHOLD = 1; // How close to center before snapping
    
    // Starting position (in grid coordinates)
    let currentGridX = 13;
    let currentGridY = 23;
    
    // Pixel position (will be kept aligned to grid)
    let x = currentGridX * CELL_SIZE + POSITION_OFFSET.x;
    let y = currentGridY * CELL_SIZE + POSITION_OFFSET.y;


    
    
    let speed = 3;
    let direction = "right";
    let nextDirection = "right";
    let isMoving = false;

    function initializePacman() {
        Object.assign(pacman.style, {
            position: 'absolute',
            width: '16px',
            height: '16px',
            left: `${x}px`,
            top: `${y}px`,
            //backgroundColor: 'white',
            borderRadius: '50%',
            visibility: 'visible',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.1s ease',
            zIndex: '1000'  // Ensure Pac-Man appears above debug overlay
        });
    }

    function isValidMove(gridX, gridY) {
        if (gridY < 0 || gridY >= mazeGrid.length || 
            gridX < 0 || gridX >= mazeGrid[0].length) {
            return false;
        }
        return mazeGrid[gridY][gridX] === 1;
    }

    function handleTunnel(gridX, gridY) {
        if (gridY === 14) {
            if (gridX <= 0) return { x: 27, y: gridY };
            if (gridX >= 27) return { x: 0, y: gridY };
        }
        return { x: gridX, y: gridY };
    }

    function getNextPosition(currentX, currentY, dir) {
        let nextX = currentX;
        let nextY = currentY;
        
        switch(dir) {
            case "right": nextX++; break;
            case "left": nextX--; break;
            case "up": nextY--; break;
            case "down": nextY++; break;
        }

        const tunnelPos = handleTunnel(nextX, nextY);
        return tunnelPos;
    }

    function isAtGridCenter() {
        const gridAlignedX = Math.round(x / CELL_SIZE) * CELL_SIZE + POSITION_OFFSET.x;
        const gridAlignedY = Math.round(y / CELL_SIZE) * CELL_SIZE + POSITION_OFFSET.y;
        return Math.abs(x - gridAlignedX) < GRID_SNAP_THRESHOLD && 
               Math.abs(y - gridAlignedY) < GRID_SNAP_THRESHOLD;
    }

    function updatePacman() {
        const currentGridX = Math.round((x - POSITION_OFFSET.x) / CELL_SIZE);
        const currentGridY = Math.round((y - POSITION_OFFSET.y) / CELL_SIZE);

        if (isAtGridCenter()) {
            if (nextDirection !== direction) {
                const nextPos = getNextPosition(currentGridX, currentGridY, nextDirection);
                if (isValidMove(nextPos.x, nextPos.y)) {
                    direction = nextDirection;
                    x = currentGridX * CELL_SIZE + POSITION_OFFSET.x;
                    y = currentGridY * CELL_SIZE + POSITION_OFFSET.y;
                }
            }
        }

        const nextPos = getNextPosition(currentGridX, currentGridY, direction);
        if (isValidMove(nextPos.x, nextPos.y)) {
            isMoving = true;
            switch(direction) {
                case "right": x += speed; break;
                case "left": x -= speed; break;
                case "up": y -= speed; break;
                case "down": y += speed; break;
            }

            if (nextPos.x === 27 && currentGridX === 0) x = nextPos.x * CELL_SIZE + POSITION_OFFSET.x;
            if (nextPos.x === 0 && currentGridX === 27) x = 0 + POSITION_OFFSET.x;
        } else {
            isMoving = false;
            x = currentGridX * CELL_SIZE + POSITION_OFFSET.x;
            y = currentGridY * CELL_SIZE + POSITION_OFFSET.y;
        }

        // Update Pac-Man's position
        pacman.style.left = `${x}px`;
        pacman.style.top = `${y}px`;

        // Update Pac-Man's rotation
        let rotation = 0;
        switch(direction) {
            case 'right': rotation = 0; break;
            case 'down': rotation = 90; break;
            case 'left': rotation = 180; break;
            case 'up': rotation = 270; break;
        }
        pacman.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    }

    document.addEventListener("keydown", (event) => {
        switch(event.key) {
            case "ArrowRight": 
                event.preventDefault();
                nextDirection = "right"; 
                break;
            case "ArrowLeft": 
                event.preventDefault();
                nextDirection = "left"; 
                break;
            case "ArrowUp": 
                event.preventDefault();
                nextDirection = "up"; 
                break;
            case "ArrowDown": 
                event.preventDefault();
                nextDirection = "down"; 
                break;
            // Debug controls
            case 'd':
                const overlay = document.getElementById('debug-overlay');
                if (overlay) {
                    overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
                }
                break;
        }
    });

    function gameLoop() {
        initializePacman();
        updatePacman();
        requestAnimationFrame(gameLoop);
    }

    
    gameLoop();
});
