class Fireman{
    constructor(){
        this.x = 100
        this.y = 100
        this.width= 100
        this.height = 100
    }
    draw(){
        const image = new Image ()
        image.src = "./image/firemanNoBackground.png" //Imagem do Fireman
        context.drawImage(image, this.x, this.y, this.width, this.height)
        setInterval(() => {
            this.draw()
        }, 30);
    }
    moveMan(key){
        context.clearRect(this.x, this.y, this.width, this.height)
        switch(key){
            case "ArrowUp":
                this.y -= 25; //Pra andar pra cima vai diminuir 25 pixels
            break;
            case "ArrowDown":
                this.y += 25
            break;
            case "ArrowLeft":
                this.x -= 25
            break;
            case "ArrowRight":
                this.x += 25
            break;
            // case "Spacebar":
            //     this.extinguishFire() Implementar caso tudo corra corretamente
        }
    }
    extinguishFire(x, y){ //Vai passar os argumentos pra saber onde a janela vai ser colocada
        const image = new Image ()
        image.src = "" //Imagem da janela sem fogo
        context.drawImage(image, x, y, 50, 50)
    }
}