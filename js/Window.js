class Window {
    constructor(){
        this.x = 0 // Na hora de chamar o x e o y vamos usar o do fireman - o width no caso do x, o y deve permanecer o mesmo
        this.y = 0
        this.width = 110 //Isso vai ser automático, vamos usar sempre 
        this.height = 145 // o mesmo pq a janela vai ter tamanho fixo
    } //W - 110 H - 145 / POSIÇÃO INICIAL: 440 537
    drawWindow(x ,y){
        const image = new Image ()
        image.src = "./image/window-clear.png" //Imagem do foguinho
        // setInterval(() => {
        //     this.drawFire()
        // }, 90);
        context.drawImage(image, x, y, this.width, this.height)
    }
}