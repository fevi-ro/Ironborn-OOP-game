function createDomElement(className) {

    const board = document.getElementById("board");
    const newElm = document.createElement("div");
    newElm.className = className;
    board.appendChild(newElm);

    return newElm;
}

function drawDomElement(instance) {
    console.log("the element to paint is... ", instance.domElement)
    console.log("new horizontal position will be... ", instance.positionX)

    instance.domElement.style.left = instance.positionX + "%";
    instance.domElement.style.bottom = instance.positionY + "%";

}



const game = new Game(createDomElement, drawDomElement);
game.start();


document.addEventListener("keydown", function(event) {


    switch (event.key) {
        case "ArrowRight":
            game.movePlayer("right");
            break;
        case "ArrowLeft":
            game.movePlayer("left");
            break;

            /* another option would be ----->
              console.log("a key was down")
            console.log(event);

            if (event.key === 'ArrowRight') {
                game.movePlayer("right");
            } else if (event.key === "ArrowLeft") { 
                game.movePlayer("left"); }
            } */

    }
});