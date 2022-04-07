class Game {
    constructor(create, draw) {
        this.player = null;
        this.create = create;
        this.draw = draw;
    }

    start() {
        this.player = new Player();
        this.player.domElement = this.create('player');
        //create a dom element with the class "player"
        this.draw(this.player);


        this.obstacle = new Obstacle();
        this.obstacle.domElement = this.create("obstacle");
        this.draw(this.obstacle);

        setInterval(() => {
            // move obstacle
            this.obstacle.moveDown();
            this.draw(this.obstacle);
        }, 150);

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
        this.positionX = 47;
        this.positionY = 0;
        this.domElement = null;
    }

    moveLeft() {
        this.positionX--;
        /* this.positionX = this.positionX - 1;
         this.positionX =- 1; */
        // test if works --> console.log(`moving left... ${this.positionX}`)


    }

    moveRight() {
        this.positionX++;
        //test if works --> console.log(`moving right... ${this.positionX}`)
    }
}


class Obstacle {
    constructor() {
        this.positionX = 47;
        this.positionY = 100;
        this.domElement = null;
    }

    moveDown() {
        this.positionY--;
    }
}