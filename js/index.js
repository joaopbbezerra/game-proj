const buildingCanvas = document.getElementById("canvas");
const context = buildingCanvas.getContext("2d");


document.getElementById("start-game").onclick = () => {
    document.getElementById("canvas").classList.add("img-new");
  startGame();
};

let newGame;

function startGame() {
  newGame = new Game();
  let newFireMan = new Fireman();
  newGame.fireMan = newFireMan;
  newGame.fireMan.draw(); 
    updateCanvas()
}

function collision (fire){
    return !(newGame.fireMan.x > fire.x + fire.width||
        newGame.fireMan.x + newGame.fireMan.width < fire.x||
        newGame.fireMan.y > fire.y + fire.height)
}

document.addEventListener("keydown", (e)=>{
    newGame.fireMan.move(e.key)
})

function updateCanvas(){
    context.clearRect(0, 0, buildingCanvas.clientWidth, buildingCanvas.clientHeight)
    newGame.fireMan.draw()
    newGame.firesFreq++
    if (newGame.firesFreq % 20 === 1){
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
            newGame.score = 0
            newGame.fires = []
            document.getElementById("canvas").style.display = "none"
            cancelAnimationFrame(newGame.animationId)
            alert("Game Over")
        }
        if (fire.y > buildingCanvas.clientHeight){
            newGame.fires.splice(index, 1)
        }
    })
    if(!newGame.gameOver){
        newGame.animationId = requestAnimationFrame(updateCanvas) //The same as the setInterval, but makes the animation smoother - 
    }
    
    
}
