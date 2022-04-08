class Game {
    constructor(create, draw) {
        this.time = 0;
        this.player = null;
        this.obstacles = [];
        this.create = create;
        this.draw = draw;
        this.bullets = [];
    }

    start() {

        // create & draw player
        this.player = new Player();
        this.player.domElement = this.create("player"); //create a dom element with the class "player"
        this.draw(this.player);

        //create & draw bullets
        this.bullet = new Bullet();
        this.bullet.domElement = this.create("bullet");
        this.draw(this.bullet);
        this.bullets.push(this.bullet);


        setInterval(() => {
            this.time++;
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



        }, 20);



    }

    detectCollision(obstacle) {
        if (this.player.positionX < obstacle.positionX + obstacle.width &&
            this.player.positionX + this.player.width > obstacle.positionX &&
            this.player.positionY < obstacle.positionY + obstacle.height &&
            this.player.height + this.player.positionY > obstacle.positionY) {

            alert("Game over!!!!!");

        }

    }

    detectObstacleOutside(obstacle) {
        if (obstacle.positionY < 0) {
            this.obstacles.shift()

            obstacle.domElement.remove(obstacle);
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

    moveBullet(direction) {
        if (direction === "left") {
            this.bullet.moveLeft();
        } else if (direction === "right") {
            this.bullet.moveRight();
        }
        this.draw(this.bullet);
    }
}


class Player {
    constructor() {
        this.positionX = 50;
        this.positionY = 0;
        this.width = 10;
        this.height = 10;
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
        this.positionX = Math.floor(Math.random() * 80)
        this.positionY = 100;
        this.width = 10;
        this.height = 10;
        this.domElement = null;

    }
    moveDown() {
        this.positionY--;
    }

}


class Bullet extends Player {
    constructor() {
        super();
        this.width = 3;
        this.height = 3;
    }

    moveLeft() {
        this.positionX--;
    }

    moveRight() {
        this.positionX++;
    }
}