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
let rightFireMan = "./image/fireMan-novo-right.png" //referencia ele virando para direita
let newGame;
let movement = leftFireMan //Por default ele vai começar virado para esquerda
let fireCracking
let hitSound
let meow

meow = new sound ("./image/meow-sound.mp3")
fireCracking = new sound("./image/fire-1.mp3")
hitSound = new sound ("./image/fireMan-scream.mp3")

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
    // sirens.pause()
}

function collision (fire){ //Pode ser reutilizada para os cats
    
    return !(newGame.fireMan.x > fire.x + fire.width - 10||
        newGame.fireMan.x + newGame.fireMan.width < fire.x + 10||
        newGame.fireMan.y > fire.y + fire.height -10 ||
        newGame.fireMan.y + newGame.fireMan.height < fire.y + 10)
} 

let controlArrayWindow = []

const keyDown = document.addEventListener("keydown", (e)=>{
    switch (e.key){
        
        case "ArrowLeft": //Muda o movement para left ou right, de acordo com a tecla pressionada
            movement = leftFireMan
        break;
        case "ArrowRight":
            movement = rightFireMan
        break;
        case "f":
        case "F":
            console.log(newGame.fireMan.x)
            //Construir janela primeiro andar
            if (newGame.fireMan.y === 497){
                if (newGame.fireMan.x >= 365){
                    const window = new Window (368, 460)
                    newGame.windows.push(window)
                    console.log(window)
                    if (!controlArrayWindow.includes("window1")){
                        controlArrayWindow.push("window1")
                        newGame.scoreWindow++
                    }
            } else if (newGame.fireMan.x >= 200 && newGame.fireMan.x < 300){
                    // console.log("cond ok", newGame.fireMan.x)
                    const window = new Window (208, 460)
                    newGame.windows.push(window)
                    if (!controlArrayWindow.includes("window2")){
                        controlArrayWindow.push("window2")
                        newGame.scoreWindow++
                    }
            } else if (newGame.fireMan.x >= 30 && newGame.fireMan.x < 140){
                    const window = new Window (48, 460)
                    newGame.windows.push(window)
                    if (!controlArrayWindow.includes("window3")){
                        controlArrayWindow.push("window3")
                        newGame.scoreWindow++
                    }
            }
            //Construir janela segundo andar
        } else if (newGame.fireMan.y === 340){
            if (newGame.fireMan.x >= 365){
                const window = new Window (368, 303)
                newGame.windows.push(window)
                console.log(window)
                if (!controlArrayWindow.includes("window4")){
                    controlArrayWindow.push("window4")
                    newGame.scoreWindow++
                }
            } else if (newGame.fireMan.x >= 200 && newGame.fireMan.x < 300){
                // console.log("cond ok", newGame.fireMan.x)
                const window = new Window (208, 303)
                newGame.windows.push(window)
                console.log(newGame.fireMan.x)
                if (!controlArrayWindow.includes("window5")){
                    controlArrayWindow.push("window5")
                    newGame.scoreWindow++
                }
            } else if (newGame.fireMan.x >= 30 && newGame.fireMan.x < 140){
                const window = new Window (48, 303)
                newGame.windows.push(window)
                if (!controlArrayWindow.includes("window6")){
                    controlArrayWindow.push("window6")
                    newGame.scoreWindow++
                }
            }
            //Construir janela terceiro andar
        } else {
            if (newGame.fireMan.x >= 365){
                const window = new Window (368, 146)
                newGame.windows.push(window)
                console.log(window)
                if (!controlArrayWindow.includes("window7")){
                    controlArrayWindow.push("window7")
                    newGame.scoreWindow++
                }
            } else if (newGame.fireMan.x >= 200 && newGame.fireMan.x < 300){
                // console.log("cond ok", newGame.fireMan.x)
                const window = new Window (208, 146)
                newGame.windows.push(window)
                if (!controlArrayWindow.includes("window8")){
                    controlArrayWindow.push("window8")
                    newGame.scoreWindow++
                }
            } else if (newGame.fireMan.x >= 30 && newGame.fireMan.x < 140){
                const window = new Window (48, 146)
                newGame.windows.push(window)
                if (!controlArrayWindow.includes("window9")){
                    controlArrayWindow.push("window9")
                    newGame.scoreWindow++
                }
            }
        }
                
            // newGame.fireMan.drawWindow(newGame.fireMan.x, newGame.fireMan.y)
        break;
    }
    newGame.fireMan.move(e.key)
})

function updateLevel (level){
    if (level > 10){ //limite de velocidade para nível 10 ou mais
        level = 10
    }
    const velocity = 70 - (level*5) //Quanto menor a velocity, maior a velocidade do jogo
    if(newGame.firesFreq % velocity === 1){
        const randomFiresX = Math.floor(Math.random() * buildingCanvas.clientWidth)
        const randomFireY = -10
        const randomFireWidth = Math.floor(Math.random() * (10+5*level) + 30)
        const randomFireHeight = Math.floor(Math.random() * (10+5*level) + 30)
        const newFire = new Fire(
            randomFiresX,
            randomFireY,
            randomFireWidth,
            randomFireHeight
        )
        newGame.fires.push(newFire)
    }
    if (newGame.catsFreq % 240 === 1){
        const randomCatsX = Math.floor(Math.random() *buildingCanvas.clientWidth)
        const randomCatsY = 0
        const newCat = new Cat (
            randomCatsX,
            randomCatsY
        )
        newGame.cats.push(newCat)
    }
    
}

function updateCatSpeed (level, cat){
    if (level < 2){
        cat.y += 2
    } else if (level < 4){
        cat.y += 3
    } else if (level < 6){
        cat.y += 4
    } else {
        cat.y += 4 + (level/2)
    }
}

function updateFireSpeed (level, fire){
    if (level < 2){
        fire.y += 2
        
    } else if (level < 4){
        fire.y += 3
        
    } else if (level < 6){
        fire.y += 4
        
    } else {
        fire.y += 4 + (level/2)
        
    }
} 


function updateCanvas(){
    context.clearRect(0, 0, buildingCanvas.clientWidth, buildingCanvas.clientHeight)
    newGame.fireMan.draw(movement)
    newGame.firesFreq++
    newGame.catsFreq++
    if (newGame.level === 1){
        document.getElementById("animation1").classList.add("font-effect-fire-animation")
        document.getElementById("animation1").innerHTML = `Level 1`
        setTimeout(() => {
            document.getElementById("animation1").style.display = "none"
        }, 2000);
    }

    updateLevel(newGame.level)

    if (controlArrayWindow.length === 9){
        newGame.level++
        document.getElementById("animation2").classList.add("font-effect-fire-animation")
        document.getElementById("animation2").innerText = `Level ${newGame.level}`
        setTimeout(() => {
            const element = document.getElementById("animation2")
            element.classList.remove("font-effect-fire-animation")
        }, 2000);
        controlArrayWindow = []
        newGame.windows = []
        newGame.fires = []
        newGame.cats = []
    }
    // if (newGame.level === 1){
    //     document.getElementById("animation1").classList.add("font-effect-fire-animation")
    //     document.getElementById("animation1").innerHTML = "Level 1"
    //     setTimeout(() => {
    //         document.getElementById("animation1").style.display = "none"
    //     }, 2000);

    //     if (controlArrayWindow.length === 9){
    //         newGame.level++
    //         controlArrayWindow = []
    //         newGame.windows = []
    //         newGame.fires = []
    //     }
    // }
    // else if (newGame.level === 2){
    //     document.getElementById("animation2").classList.add("font-effect-fire-animation")
    //     document.getElementById("animation2").innerHTML = "Level 2"
    //     setTimeout(() => {
    //         document.getElementById("animation2").style.display = "none"
    //     }, 2000);
    //     if (newGame.firesFreq % 60 === 1){
    //         const randomFiresX = Math.floor(Math.random() *buildingCanvas.clientWidth)
    //         const randomFireY = -100
    //         const randomFireWidth = Math.floor(Math.random() * 20 + 30)
    //         const randomFireHeight = Math.floor(Math.random() * 20 + 30)
    //         //Random do tamanho caso consigamos implementar tudo - fase 2 e 3
    //         //Lembrar de alterar no Fire o construtor caso queira passar width e height
    //         const newFire = new Fire (
    //             randomFiresX,
    //             randomFireY,
    //             randomFireWidth,
    //             randomFireHeight
    //         )
    //         newGame.fires.push(newFire)
    //     }
    //     if (controlArrayWindow.length === 9){
    //         newGame.level++
    //         controlArrayWindow = []
    //         newGame.windows = []
    //         newGame.fires = []
    //     }
    // }
    // else if (newGame.level === 3){
    //     document.getElementById("animation3").classList.add("font-effect-fire-animation")
    //     document.getElementById("animation3").innerHTML = "Level 3" 
    //     setTimeout(() => {
    //         document.getElementById("animation3").style.display = "none"
    //     }, 2000);
    //     if (newGame.firesFreq % 60 === 1){
    //         const randomFiresX = Math.floor(Math.random() *buildingCanvas.clientWidth)
    //         const randomFireY = -100
    //         const randomFireWidth = Math.floor(Math.random() * 30 + 40)
    //         const randomFireHeight = Math.floor(Math.random() * 30 + 40)
    //         //Random do tamanho caso consigamos implementar tudo - fase 2 e 3
    //         //Lembrar de alterar no Fire o construtor caso queira passar width e height
    //         const newFire = new Fire (
    //             randomFiresX,
    //             randomFireY,
    //             randomFireWidth,
    //             randomFireHeight
    //         )
    //         newGame.fires.push(newFire)
    //     }
    //     if (controlArrayWindow.length === 9){
    //         newGame.level++
    //         controlArrayWindow = []
    //         newGame.windows = []
    //         newGame.fires = []
    //     }
    // }
    // if (newGame.level === 4){
    //     newGame.gameOver = true
    //     newGame.firesFreq = 0
    //     fireCracking.stop()
    //     hitSound.play()
    //     alert(`Good Game! Final Score: ${newGame.score}`)
    //     // console.log(`New Game Score:${newGame.score} NewBestScore: ${newBestScore}`) Apenas para testar
    //     newGame.score = 0
    //     newGame.fires = []
    //     newGame.windows = []
    //     controlArrayWindow = []
    //     document.getElementById("score").innerHTML = 0
    //     document.getElementById("bestScore").innerHTML = maxScore
    //     // document.getElementById("canvas").style.display = "none" //Comentado pq tava bugando o score. 
    //     //O score tava deletando o fogo que ainda tinha na imagem e somando no score.
    //     //Duas opções: 1 - Mudar a forma de contagem de fogo para tempo
    //     // 2 - Mudar a forma como ele verifica ou simplesmente deixar ele sem colocar o "none" que é o que faz apagar o width e contar os pontos a mais
    //     cancelAnimationFrame(newGame.animationId)
        
    // }


        
    // console.log(controlArrayWindow)
    
    newBestScore.push(newGame.score)
    maxScore = Math.max(...newBestScore) //Best score implementado - Tem espaço para melhoria

    

    newGame.windows.forEach((window) => {
        window.drawWindow()
        newGame.fireMan.draw(movement)
        
    })


    // if (controlArrayWindow.length === 9){ //Janelas validadas
    //     newGame.gameOver = true
    //     newGame.firesFreq = 0
    //     fireCracking.stop()
    //     hitSound.play()
    //     newGame.score = 0
    //     newGame.fires = []
    //     document.getElementById("score").innerHTML = 0
    //     document.getElementById("bestScore").innerHTML = maxScore
    //     controlArrayWindow = []
    //     cancelAnimationFrame(newGame.animationId)
    // }
    
    newGame.cats.forEach((cat, index) => {
        updateCatSpeed(newGame.level, cat)
        cat.drawCat()
        if (collision(cat)){
            newGame.cats.splice(index, 1)
            newGame.ScoreCat++
            meow.play()
        }
    })


    newGame.fires.forEach((fire, index)=>{
        updateFireSpeed(newGame.level, fire)
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
