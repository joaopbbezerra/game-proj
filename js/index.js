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
    setInterval(() => {
        updateCanvas();
    }, 90);
}

document.addEventListener("keydown", (e)=>{
    newGame.fireMan.move(e.key)
})

function updateCanvas(){
    context.clearRect(0, 0, buildingCanvas.clientWidth, buildingCanvas.clientHeight)
    newGame.fireMan.draw()
    newGame.firesFreq++
    if (newGame.firesFreq % 150 === 1){
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
        fire.y += 2 //Descer de 3 em 3, mas não acumulando velocidade
        fire.drawFire()
        if (fire.y > buildingCanvas.clientHeight){
            newGame.fires.splice(index, 1)
        }
    })
    newGame.animationId = requestAnimationFrame(updateCanvas) //The same as the setInterval, but makes the animation smoother - 
    
}
