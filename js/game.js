class Game {
    constructor(create, draw) {
        this.time = 0;
        this.player = null;
        this.obstacles = []; // array of instances of the class Obstacle
        this.create = create;
        this.draw = draw;
    }

    start() {

        // create & draw player
        this.player = new Player();
        this.player.domElement = this.create("player"); //create a dom element with the class "player"
        this.draw(this.player);

        setInterval(() => {

            // move obstacles
            this.obstacles.forEach((obstacle) => {
                obstacle.moveDown();
                this.draw(obstacle);
                this.detectCollision(obstacle);
                this.detectObstacleOutside(obstacle);
            });

            // create & draw an obstacles
            if (this.time % 60 === 0) {
                const newObstacle = new Obstacle();
                newObstacle.domElement = this.create("obstacle");
                this.obstacles.push(newObstacle);
            }

            this.time++;

        }, 50);
    }

    detectCollision(obstacle) {
        if (this.player.positionX < obstacle.positionX + obstacle.width &&
            this.player.positionX + this.player.width > obstacle.positionX &&
            this.player.positionY < obstacle.positionY + obstacle.height &&
            this.player.height + this.player.positionY > obstacle.positionY) {
            console.log("game over")
        }
    }

    detectObstacleOutside(obstacle) {
        if (obstacle.positionY < 0) {
            this.obstacles.shift(); // remove from array
            obstacle.domElement.remove(); // remove from the dom
        }
    }

    movePlayer(direction) {
        if (direction === "left") {
            this.player.moveLeft();
        } else if (direction === "right") {
            this.player.moveRight();
        }
        this.draw(this.player);
    }



}


class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 50;
        this.positionY = 0;
        this.domElement = null;
    }

    moveLeft() {
        this.positionX--;
    }

    moveRight() {
        this.positionX++;
    }
}


class Obstacle {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * 80)
        this.positionY = 100;
        this.domElement = null;
    }
    moveDown() {
        this.positionY--;
    }
}