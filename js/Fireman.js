class Fireman{
    constructor(){
        this.x = 90
        this.y = 60
        this.width= 150
        this.height = 180
    }
    draw(){
        const image = new Image ()
        image.src = "./image/firemanNoBackground.png" //Imagem do Fireman
        context.drawImage(image, this.x, this.y, this.width, this.height)
        setInterval(() => {
            this.draw()
        }, 90);
    }
    move(key){
        context.clearRect(this.x, this.y, this.width, this.height)
        switch(key){
            case "ArrowUp":
                this.y -= 230; //Pra andar pra cima vai diminuir 25 pixels
            break;
            case "ArrowDown":
                this.y += 230
            break;
            case "ArrowLeft":
                this.x -= 200
            break;
            case "ArrowRight":
                this.x += 200
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