class FruitManager {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.fruits = [];
        this.fruitTypes = [
            { type: 'strawberry', points: 100 },
            { type: 'cherry', points: 50 }
        ];
        this.spawnInterval = null;
    }

    spawnFruit() {
        // Randomly select fruit type
        const fruitType = this.fruitTypes[Math.floor(Math.random() * this.fruitTypes.length)];
        
        // Random position within game board
        const x = Math.random() * (this.gameBoard.clientWidth - 20);
        const y = Math.random() * (this.gameBoard.clientHeight - 20);

        const fruit = document.createElement('div');
        fruit.classList.add('fruit', fruitType.type);
        fruit.style.left = `${x}px`;
        fruit.style.top = `${y}px`;
        fruit.dataset.points = fruitType.points;

        this.gameBoard.appendChild(fruit);
        this.fruits.push(fruit);

        // Auto-remove fruit after 10 seconds
        setTimeout(() => this.removeFruit(fruit), 10000);
    }

    removeFruit(fruit) {
        if (fruit.parentNode) {
            this.gameBoard.removeChild(fruit);
        }
        this.fruits = this.fruits.filter(f => f !== fruit);
    }

    startSpawning() {
        // Spawn fruits every 5-15 seconds
        this.spawnInterval = setInterval(() => {
            if (Math.random() < 0.7) {  // 70% chance to spawn
                this.spawnFruit();
            }
        }, 5000 + Math.random() * 10000);
    }

    stopSpawning() {
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
        }
    }

    checkFruitCollection(pacman) {
        this.fruits.forEach((fruit, index) => {
            const fruitRect = fruit.getBoundingClientRect();
            const pacmanRect = pacman.getBoundingClientRect();

            if (this.isColliding(fruitRect, pacmanRect)) {
                // Collect fruit
                const points = parseInt(fruit.dataset.points);
                this.updateScore(points);
                this.removeFruit(fruit);
            }
        });
    }

    isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    updateScore(points) {
        // You'll need to implement this based on your game's scoring system
        console.log(`Collected fruit! +${points} points`);
    }
}

// Example of how to integrate with your existing Pac-Man game
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const fruitManager = new FruitManager(gameBoard);
    
    // Assuming you have a pacman element
    const pacman = document.getElementById('pacman');

    // Start fruit spawning
    fruitManager.startSpawning();

    // Add collision detection to your game loop
    function gameLoop() {
        fruitManager.checkFruitCollection(pacman);
        // Your existing game loop code
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
});