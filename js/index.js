const buildingCanvas = document.getElementById("canvas")
const context = buildingCanvas.getContext("2d")

document.getElementById("start-game").onclick = () =>{
    document.getElementById("canvas").classList.add("img-new")
    console.log("Testing")
}