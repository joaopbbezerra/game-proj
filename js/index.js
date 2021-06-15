const buildingCanvas = document.getElementById("canvas");
const context = buildingCanvas.getContext("2d");


document.getElementById("start-game").onclick = () => {
    document.getElementById("canvas").classList.add("img-new");
  startGame();
  document.getElementById("door-image").style.display = "block"; //Carregar imagem da porta depois do Start Game
};
let maxScore
let newBestScore = [] //Ainda ta sendo implementado
let leftFireMan = "./image/fireMan-novoFinal.png" // referencia ele virando para esquerda
let rightFireMan = "./image/fireMan-noBg-right.png" //referencia ele virando para direita
let newGame;
let movement = leftFireMan //Por default ele vai começar virado para esquerda
let fireCracking
let hitSound
fireCracking = new sound("./image/fire-1.mp3")
hitSound = new sound ("./image/explosion-sound.mp3")

//Depois vou implementar o sound como class, apenas pra deixar o código mais clean
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
        newGame.fireMan.y > fire.y + fire.height ||
        newGame.fireMan.y + newGame.fireMan.height < fire.y)
} 


document.addEventListener("keydown", (e)=>{
    switch (e.key){
        
        case "ArrowLeft": //Muda o movement para left ou right, de acordo com a tecla pressionada
            movement = leftFireMan
        break;
        case "ArrowRight":
            movement = rightFireMan
        break;
        case "f":
        case "F":
            //Construir janela primeiro andar
            if (newGame.fireMan.y === 570){
                if (newGame.fireMan.x >= 420){
                    const window = new Window (440, 537)
                    newGame.windows.push(window)
            } else if (newGame.fireMan.x >= 240 && newGame.fireMan.x < 390){
                    console.log("cond ok", newGame.fireMan.x)
                    const window = new Window (250, 537)
                    newGame.windows.push(window)
            } else if (newGame.fireMan.x >= 60 && newGame.fireMan.x < 210){
                    const window = new Window (60, 537)
                    newGame.windows.push(window)
            }
            //Construir janela segundo andar
        } else if (newGame.fireMan.y === 390){
            if (newGame.fireMan.x >= 420){
                const window = new Window (440, 357)
                newGame.windows.push(window)
            } else if (newGame.fireMan.x >= 240 && newGame.fireMan.x < 390){
                console.log("cond ok", newGame.fireMan.x)
                const window = new Window (250, 357)
                newGame.windows.push(window)
            } else if (newGame.fireMan.x >= 60 && newGame.fireMan.x < 210){
                const window = new Window (60, 357)
                newGame.windows.push(window)
            }
            //Construir janela terceiro andar
        } else {
            if (newGame.fireMan.x >= 420){
                const window = new Window (440, 170)
                newGame.windows.push(window)
            } else if (newGame.fireMan.x >= 240 && newGame.fireMan.x < 390){
                console.log("cond ok", newGame.fireMan.x)
                const window = new Window (250, 170)
                newGame.windows.push(window)
            } else if (newGame.fireMan.x >= 60 && newGame.fireMan.x < 210){
                const window = new Window (60, 170)
                newGame.windows.push(window)
            }
        }
                
                console.log(newGame.fireMan.x)
                console.log(newGame.fireMan.y)
            // newGame.fireMan.drawWindow(newGame.fireMan.x, newGame.fireMan.y)
        break;
    }
    newGame.fireMan.move(e.key)
})


// const setContador = new Set (newGame.windows)
// let contador = setContador.length


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
    
    
    newBestScore.push(newGame.score)
    maxScore = Math.max(...newBestScore) //Best score implementado - Tem espaço para melhoria


    newGame.windows.forEach((window) => {
        window.drawWindow()
        newGame.fireMan.draw(movement)
        
    })
    // if (contador === 9){ //Janelas validadas
    //     newGame.gameOver = true
    //     newGame.firesFreq = 0
    //         fireCracking.stop()
    //         hitSound.play()
    //         alert(`You Won! Final Score: ${newGame.score}`)
    //         newGame.score = 0
    //         newGame.fires = []
    //         document.getElementById("score").innerHTML = 0
    //         document.getElementById("bestScore").innerHTML = maxScore
    //         cancelAnimationFrame(newGame.animationId)
    // }
    
    newGame.fires.forEach((fire, index)=>{
        fire.y += 3 //Descer de 3 em 3, mas não acumulando velocidade
        fire.drawFire()
        if (collision(fire)){
            newGame.gameOver = true
            newGame.firesFreq = 0
            fireCracking.stop()
            hitSound.play()
            alert(`Game Over! Final Score: ${newGame.score}`)
            
            // console.log(`New Game Score:${newGame.score} NewBestScore: ${newBestScore}`) Apenas para testar
            
            newGame.score = 0
            newGame.fires = []
            document.getElementById("score").innerHTML = 0
            document.getElementById("bestScore").innerHTML = maxScore
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
