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
    updateCanvas()  
}, 60);
}

document.addEventListener("keydown", (e)=>{
    newGame.fireMan.move(e.key)
})

function updateCanvas(){
    context.clearRect(0, 0, buildingCanvas.clientWidth, buildingCanvas.clientHeight)
    newGame.fireMan.draw()
    newGame.firesFreq++
    console.log("Ok")
    if (newGame.firesFreq % 100 === 1){
        const randomFiresX = Math.floor(Math.random() *buildingCanvas.clientWidth)
        const randomFireY = 0
        //Random do tamanho caso consigamos implementar tudo - fase 2 e 3
        //Lembrar de alterar no Fire o construtor caso queira passar width e height
        const newFire = new Fire (
            randomFiresX,
            randomFireY,
        )
        
        newGame.fires.push(newFire)
        console.log(newGame.fires[0])
    }
    newGame.fires.forEach((fire)=>{
        console.log(fire.y)
        fire.y += 3 //Descer de 3 em 3, mas não acumulando velocidade
        fire.drawFire()
        console.log(fire.y)
    })
    newGame.animationId = requestAnimationFrame(updateCanvas) //The same as the setInterval, but makes the animation smoother - 
    
}
