const buildingCanvas = document.getElementById("canvas");
const context = buildingCanvas.getContext("2d");


document.getElementById("start-game").onclick = () => {
    document.getElementById("canvas").classList.add("img-new");
  
  startGame();
};

let currentGame;

function startGame() {
  newGame = new Game();

  let newFireMan = new Fireman();
  newGame.fireMan = newFireMan;
  newGame.fireMan.draw();   
}
