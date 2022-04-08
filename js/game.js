class Game {
    constructor(create, draw, damage) {
        this.time = 0;
        this.player = null;
        this.obstacles = [];
        this.create = create;
        this.draw = draw;
        this.bullets = [];
        this.damage = damage;


    }

    start() {

        // create & draw player
        this.player = new Player();

        this.player.domElement = this.create("player"); //create a dom element with the class "player"
        this.draw(this.player);





        setInterval(() => {
            this.time++;
            // move obstacles
            this.obstacles.forEach((obstacle) => {
                obstacle.moveDown();
                this.draw(obstacle);
                this.detectCollision(obstacle);
                this.detectObstacleOutside(obstacle);


            });

            // create & draw obstacles
            if (this.time % 60 === 0) {
                const newObstacle = new Obstacle();
                newObstacle.domElement = this.create("obstacle");
                this.obstacles.push(newObstacle);

            }

            //get more bullets from bullets Array
            this.bullets.forEach((element) => {
                for (let i = 0; i < this.obstacles.length; i++) {
                    element.moveUp()
                    this.draw(element)
                }

            })


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


    // create, draw and shoot bullets
    shootBullets() {
        this.bullet = new Bullet();
        this.bullet.domElement = this.create("bullet");
        this.draw(this.bullet);
        this.bullets.push(this.bullet);
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
            this.bullets.moveLeft();

        } else if (direction === "right") {
            this.bullets.moveRight();
        }

        direction = "up";

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
    constructor(health, damage) {
        this.positionX = Math.floor(Math.random() * 80)
        this.positionY = 100;
        this.width = 10;
        this.height = 10;
        this.domElement = null;
        this.health = health;
        this.damage = damage;

    }
    moveDown() {
        this.positionY--;
    }

    takeDamage(damage) {
        this.health -= damage;
    }

}


class Bullet extends Player {
    constructor() {
        super();
        this.width = 3;
        this.height = 3;


    }



    moveUp() {
        this.positionY++;
    }


    detectCollision(bullet) {
        if (
            bullet.positionX < this.obstacle.positionX + this.obstacle.width &&
            bullet.positionX + bullet.width > this.obstacle.positionX &&
            bullet.positionY < this.obstacle.positionY + this.obstacle.height &&
            bullet.height + bullet.positionY > this.obstacle.positionY
        ) {
            this.obstacle.takeDamage(this.damage);
            this.obstacles.shift()

            this.obstacle.domElement.remove(this.obstacle);

        }
        return false;
    }



}