document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const popSound = document.getElementById('popSound');
    const circleRadius = 50;
    let score = 0;

    // Create a circle SVG element
    function createCircle(x, y) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', circleRadius);
        circle.style.fill = `hsl(${Math.random() * 360}, 75%, 75%)`;
        circle.style.opacity = 1;
        circle.style.transition = 'opacity 0.5s';
        return circle;
    }

    // pop a circle 
    function popCircle(event) {
        const circle = event.target;
        circle.style.opacity = 0;
        popSound.play(); // Play pop sound
        setTimeout(() => {
            gameBoard.removeChild(circle);
            score++;
            scoreDisplay.textContent = score;
        }, 500);
    }

    // add circles
    function addCircles() {
        const x = Math.random() * (gameBoard.clientWidth - 2 * circleRadius) + circleRadius;
        const y = Math.random() * (gameBoard.clientHeight - 2 * circleRadius) + circleRadius;
        const circle = createCircle(x, y);
        circle.addEventListener('click', popCircle);
        gameBoard.appendChild(circle);
    }

    // Add circles every 2 seconds
    const addCirclesInterval = setInterval(addCircles, 2000);

    //manually add circles
    const addCirclesBtn = document.getElementById('addCirclesBtn');
    addCirclesBtn.addEventListener('click', addCircles);

    //volume
    popSound.volume = 0.5; 
});
