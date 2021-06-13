const buildingCanvas = document.getElementById("canvas");
const context = buildingCanvas.getContext("2d");


document.getElementById("start-game").onclick = () => {
    document.getElementById("canvas").classList.add("img-new");
  startGame();
};

let leftFireMan = "./image/fireMan-novoFinal.png" // referencia ele virando para esquerda
let rightFireMan = "./image/fireMan-noBg-right.png" //referencia ele virando para direita
let newGame;
let movement = leftFireMan //Por default ele vai começar virado para esquerda
let fireCracking
fireCracking = new sound("./image/fire-1.mp3")

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }



function startGame() {
  newGame = new Game();
  let newFireMan = new Fireman();
  newGame.fireMan = newFireMan;
  newGame.fireMan.draw(movement); 
  fireCracking.play()
    updateCanvas()
}

function collision (fire){
    return !(newGame.fireMan.x > fire.x + fire.width||
        newGame.fireMan.x + newGame.fireMan.width < fire.x||
        newGame.fireMan.y > fire.y + fire.height)
}


document.addEventListener("keydown", (e)=>{
    switch (e.key){
        case "ArrowLeft": //Muda o movement para left ou right, de acordo com a tecla pressionada
            movement = leftFireMan
        break;
        case "ArrowRight":
            movement = rightFireMan
    }
    newGame.fireMan.move(e.key)
})

function updateCanvas(){
    context.clearRect(0, 0, buildingCanvas.clientWidth, buildingCanvas.clientHeight)
    newGame.fireMan.draw(movement)
    newGame.firesFreq++
    if (newGame.firesFreq % 60 === 1){
        const randomFiresX = Math.floor(Math.random() *buildingCanvas.clientWidth)
        const randomFireY = -100
        //Random do tamanho caso consigamos implementar tudo - fase 2 e 3
        //Lembrar de alterar no Fire o construtor caso queira passar width e height
        const newFire = new Fire (
            randomFiresX,
            randomFireY,
        )
        
        newGame.fires.push(newFire)
    }
    newGame.fires.forEach((fire, index)=>{
        fire.y += 3 //Descer de 3 em 3, mas não acumulando velocidade
        fire.drawFire()
        if (collision(fire)){
            newGame.gameOver = true
            newGame.firesFreq = 0
            fireCracking.stop()
            alert(`Game Over! Final Score: ${newGame.score}`)
            newGame.score = 0
            newGame.fires = []
            document.getElementById("score").innerHTML = 0
            // document.getElementById("canvas").style.display = "none" //Comentado pq tava bugando o score. 
            //O score tava deletando o fogo que ainda tinha na imagem e somando no score.
            //Duas opções: 1 - Mudar a forma de contagem de fogo para tempo
            // 2 - Mudar a forma como ele verifica ou simplesmente deixar ele sem colocar o "none" que é o que faz apagar o width e contar os pontos a mais
            cancelAnimationFrame(newGame.animationId)
            
        }
        if (fire.y > buildingCanvas.clientHeight){
            newGame.score++
            document.getElementById("score").innerHTML = newGame.score
            newGame.fires.splice(index, 1)
        }
    })
    if(!newGame.gameOver){
        newGame.animationId = requestAnimationFrame(updateCanvas) //The same as the setInterval, but makes the animation smoother - 
    }
    
    
}
