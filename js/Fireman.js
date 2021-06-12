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
        // setInterval(() => { //Opção de tirar o draw de dentro do set interval e o fogo descer suave
        //     this.draw()    
        // }, 90); Se colocar o draw no start game ele já funciona, mas a velocidade tá ficando infinita.
    }
    move(key){
        context.clearRect(this.x, this.y, this.width, this.height)
        switch(key){
            case "ArrowUp":
                if (this.y > 230){
                    this.y -= 230; //Pra andar pra cima vai diminuir 25 pixels
                }
            break;
            case "ArrowDown":
                if (this.y < 460){
                    this.y += 230
                }
            break;
            case "ArrowLeft":
                if (this.x > 200){
                    this.x -= 200
                }
            break;
            case "ArrowRight":
                if (this.x < 400){
                    this.x += 200
                }
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