class Window {
    constructor(x, y){
        this.x = x // Na hora de chamar o x e o y vamos usar o do fireman - o width no caso do x, o y deve permanecer o mesmo
        this.y = y
        this.width = 60 //Isso vai ser automático, vamos usar sempre 
        this.height = 60 // o mesmo pq a janela vai ter tamanho fixo
    }
    drawWindow(){
        const image = new Image ()
        image.src = "./image/fire_Nobackground.png" //Imagem do foguinho
        // setInterval(() => {
        //     this.drawFire()
        // }, 90);
        context.drawImage(image, this.x, this.y, this.width, this.height)
    }
}