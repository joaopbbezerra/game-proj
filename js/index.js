const buildingCanvas = document.getElementById("canvas");
const context = buildingCanvas.getContext("2d");

document.getElementById("start-game").onclick = () => {
  document.getElementById("canvas").classList.add("img-new");

  startGame();
  /*document.getElementById("toNone").style.display = "none" //firetruck a desaparecer*/
  document
    .getElementById("title-instructions")
    .classList.add("title-instructions2");
  document.getElementById("door-image").style.display = "block"; //Carregar imagem da porta depois do Start Game
};
let maxScore;
let newBestScore = []; //Ainda ta sendo implementado
let leftFireMan = "./image/fireMan-novoFinal.png"; // referencia ele virando para esquerda
let rightFireMan = "./image/fireMan-novo-right.png"; //referencia ele virando para direita
let newGame;
let movement = leftFireMan; //Por default ele vai começar virado para esquerda
let fireCracking;
let hitSound;
let meow;
let waterSound;
let witchSound;
let oldLady = "./image/cat-lady.png";
let fireToDraw = "./image/fireDrop-nobg.png";
let cuteCat = "./image/cat-meow.png";
let newBestArray = []

witchSound = new sound("./sound/witch-laugh.mp3");
waterSound = new sound("./sound/water-effect.mp3");
meow = new sound("./sound/meow-sound.mp3");
fireCracking = new sound("./sound/fire-1.mp3");
hitSound = new sound("./sound/fireMan-scream.mp3");

//Depois vou implementar o sound como class, apenas pra deixar o código mais clean
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

let playerName;
function startGame() {
  playerName = window.prompt("Enter your name: ");
  newGame = new Game();
  let newFireMan = new Fireman();
  newGame.fireMan = newFireMan;
  newGame.fireMan.draw(movement);
  fireCracking.play();
  updateCanvas();
  // sirens.pause()
}

function collision(fire) {
  //Pode ser reutilizada para os cats

  return !(
    newGame.fireMan.x > fire.x + fire.width - 10 ||
    newGame.fireMan.x + newGame.fireMan.width < fire.x + 10 ||
    newGame.fireMan.y > fire.y + fire.height - 10 ||
    newGame.fireMan.y + newGame.fireMan.height < fire.y + 10
  );
}

let controlArrayWindow = [];

const keyDown = document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft": //Muda o movement para left ou right, de acordo com a tecla pressionada
      movement = leftFireMan;
      break;
    case "ArrowRight":
      movement = rightFireMan;
      break;
    case "f":
    case "F":
      console.log(newGame.fireMan.x);
      //Construir janela primeiro andar
      if (newGame.fireMan.y === 497) {
        if (newGame.fireMan.x >= 365) {
          const window = new Window(368, 460);
          newGame.windows.push(window);
          console.log(window);
          if (!controlArrayWindow.includes("window1")) {
            waterSound.play();
            controlArrayWindow.push("window1");
            newGame.scoreWindow++;
          }
        } else if (newGame.fireMan.x >= 200 && newGame.fireMan.x < 300) {
          // console.log("cond ok", newGame.fireMan.x)
          const window = new Window(208, 460);
          newGame.windows.push(window);
          if (!controlArrayWindow.includes("window2")) {
            waterSound.play();
            controlArrayWindow.push("window2");
            newGame.scoreWindow++;
          }
        } else if (newGame.fireMan.x >= 30 && newGame.fireMan.x < 140) {
          const window = new Window(48, 460);
          newGame.windows.push(window);
          if (!controlArrayWindow.includes("window3")) {
            waterSound.play();
            controlArrayWindow.push("window3");
            newGame.scoreWindow++;
          }
        }
        //Construir janela segundo andar
      } else if (newGame.fireMan.y === 340) {
        if (newGame.fireMan.x >= 365) {
          const window = new Window(368, 303);
          newGame.windows.push(window);
          console.log(window);
          if (!controlArrayWindow.includes("window4")) {
            waterSound.play();
            controlArrayWindow.push("window4");
            newGame.scoreWindow++;
          }
        } else if (newGame.fireMan.x >= 200 && newGame.fireMan.x < 300) {
          // console.log("cond ok", newGame.fireMan.x)
          const window = new Window(208, 303);
          newGame.windows.push(window);
          console.log(newGame.fireMan.x);
          if (!controlArrayWindow.includes("window5")) {
            waterSound.play();
            controlArrayWindow.push("window5");
            newGame.scoreWindow++;
          }
        } else if (newGame.fireMan.x >= 30 && newGame.fireMan.x < 140) {
          const window = new Window(48, 303);
          newGame.windows.push(window);
          if (!controlArrayWindow.includes("window6")) {
            waterSound.play();
            controlArrayWindow.push("window6");
            newGame.scoreWindow++;
          }
        }
        //Construir janela terceiro andar
      } else {
        if (newGame.fireMan.x >= 365) {
          const window = new Window(368, 146);
          newGame.windows.push(window);
          console.log(window);
          if (!controlArrayWindow.includes("window7")) {
            waterSound.play();
            controlArrayWindow.push("window7");
            newGame.scoreWindow++;
          }
        } else if (newGame.fireMan.x >= 200 && newGame.fireMan.x < 300) {
          // console.log("cond ok", newGame.fireMan.x)
          const window = new Window(208, 146);
          newGame.windows.push(window);
          if (!controlArrayWindow.includes("window8")) {
            waterSound.play();
            controlArrayWindow.push("window8");
            newGame.scoreWindow++;
          }
        } else if (newGame.fireMan.x >= 30 && newGame.fireMan.x < 140) {
          const window = new Window(48, 146);
          newGame.windows.push(window);
          if (!controlArrayWindow.includes("window9")) {
            waterSound.play();
            controlArrayWindow.push("window9");
            newGame.scoreWindow++;
          }
        }
      }

      // newGame.fireMan.drawWindow(newGame.fireMan.x, newGame.fireMan.y)
      break;
  }
  newGame.fireMan.move(e.key);
});

function updateLevel(level) {
  if (level > 15) {
    //limite de velocidade para nível 10 ou mais
    level = 16;
  }

  const velocity = 70 - level * 5; //Quanto menor a velocity, maior a velocidade do jogo
  if (newGame.firesFreq % velocity === 1) {
    const randomFiresX = Math.floor(Math.random() * buildingCanvas.clientWidth);
    const randomFireY = -10;
    const randomFireWidth = Math.floor(Math.random() * (10 + 5 * level) + 30);
    const randomFireHeight = Math.floor(Math.random() * (10 + 5 * level) + 30);
    const newFire = new Fire(
      randomFiresX,
      randomFireY,
      randomFireWidth,
      randomFireHeight
    );
    newGame.fires.push(newFire);
  }
  if (newGame.catsFreq % 240 === 1) {
    const randomCatsX = Math.floor(Math.random() * buildingCanvas.clientWidth);
    const randomCatsY = 0;
    const newCat = new Cat(randomCatsX, randomCatsY);
    newGame.cats.push(newCat);
  }

  if (newGame.score % 15 === 1) {
    newGame.score++;
    const randomLadyX = Math.floor(Math.random() * buildingCanvas.clientWidth);
    const randomLadyY = 0;
    const newLady = new Lady(randomLadyX, randomLadyY);
    newGame.ladies.push(newLady);
  }
}

function updateObjSpeed(level, obj) {
  if (level < 2) {
    obj.y += 2;
  } else if (level < 4) {
    obj.y += 3;
  } else if (level < 6) {
    obj.y += 4;
  } else {
    obj.y += 4 + level / 2;
  }
}



function updateCanvas() {
  context.clearRect(
    0,
    0,
    buildingCanvas.clientWidth,
    buildingCanvas.clientHeight
  );
  newGame.fireMan.draw(movement);
  newGame.firesFreq++;
  newGame.catsFreq++;
  newGame.ladyFreq++;
  if (newGame.level === 1) {
    document
      .getElementById("animation1")
      .classList.add("font-effect-fire-animation");
    document.getElementById("animation1").innerHTML = `Level 1`;
    setTimeout(() => {
      document.getElementById("animation1").style.display = "none";
    }, 2000);
  }
  
  updateLevel(newGame.level);

  if (controlArrayWindow.length === 9) {
    newGame.level++;
    document
      .getElementById("animation2")
      .classList.add("font-effect-fire-animation");
    document.getElementById("animation2").innerText = `Level ${newGame.level}`;
    setTimeout(() => {
      const element = document.getElementById("animation2");
      element.classList.remove("font-effect-fire-animation");
    }, 2000);
    controlArrayWindow = [];
    newGame.windows = [];
    newGame.fires = [];
    newGame.cats = [];
  }
  
  newBestScore.push(newGame.score);
  maxScore = Math.max(...newBestScore); //Best score implementado - Tem espaço para melhoria

  newGame.windows.forEach((window) => {
    window.drawWindow();
    newGame.fireMan.draw(movement);
  });

  
  newGame.cats.forEach((cat, index) => {
    updateObjSpeed(newGame.level, cat);
    cat.drawCat(cuteCat);
    if (collision(cat)) {
      newGame.cats.splice(index, 1);
      newGame.scoreCat++;
      document.getElementById("score").innerHTML = newGame.scoreCat;
      meow.play();
    }
  });

  newGame.ladies.forEach((lady, index) => {
    updateObjSpeed(newGame.level, lady);
    lady.drawLady(oldLady);
    if (collision(lady)) {
      witchSound.play();
      newGame.ladies.splice(index, 1);
      newGame.ladiesScore++;
      fireToDraw = "./image/fireDrop-nobg.png"; //
      cuteCat = "./image/fireMan-novoFinal.png"; //
      leftFireMan = "./image/cat-meow.png"; // referencia ele virando para esquerda
      rightFireMan = "./image/cat-right.png"; //referencia ele virando para direita
      if (newGame.ladiesScore % 2 === 0) {
        fireToDraw = "./image/fireDrop-nobg.png"; //
        cuteCat = "./image/cat-meow.png"; //
        leftFireMan = "./image/fireMan-novoFinal.png"; // referencia ele virando para esquerda
        rightFireMan = "./image/fireMan-novo-right.png"; //referencia ele virando para direita
        // newGame.fireMan.draw(leftFireMan)
      }
    }
  });

  newGame.fires.forEach((fire, index) => {
    updateObjSpeed(newGame.level, fire);
    fire.drawFire(fireToDraw);

    if (collision(fire)) {
      newGame.gameOver = true;
      newGame.firesFreq = 0;
      fireCracking.stop();
      hitSound.play();
      // console.log(`New Game Score:${newGame.score} NewBestScore: ${newBestScore}`) Apenas para testar
      if (playerName){
        localStorage.setItem(playerName, newGame.level)
        console.log(localStorage)
        if (localStorage.length > 1){
            for (let i=0; i<localStorage.length; i++){
                if (localStorage.getItem(localStorage.key(0)) > localStorage.getItem(localStorage.key(1))){
                    localStorage.removeItem(localStorage.key(1))
                } else{
                    localStorage.removeItem(localStorage.key(0))
                }
            }
        }
      }
      newGame.score = 0;
      newGame.fires = [];
      document.getElementById("score").innerHTML = 0;
      document.getElementById("nameScore").innerHTML = `${
        playerName.charAt(0).toUpperCase() + playerName.substring(1)
      } caught ${newGame.scoreCat} cats! And look, you made it to level ${
        newGame.level
      }`;
      document.getElementById("bestScore").innerHTML = `${localStorage.key(0)} : ${localStorage.getItem(localStorage.key(0))}`
      cancelAnimationFrame(newGame.animationId);
    }
    if (fire.y > buildingCanvas.clientHeight) {
      newGame.score++;
      newGame.fires.splice(index, 1);
    }
  });
  if (!newGame.gameOver) {
    newGame.animationId = requestAnimationFrame(updateCanvas); //The same as the setInterval, but makes the animation smoother -
  }
}
