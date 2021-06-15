class Fireman{
    constructor(){
        this.x = 490
        this.y = 550
        this.width= 110
        this.height = 130
    }
    draw(movement){
        const image = new Image ()
        image.src = movement //Imagem do Fireman
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
                    this.y -= 180; //Pra andar pra cima vai diminuir 25 pixels
                }
            break;
            case "ArrowDown":
                if (this.y < 460){
                    this.y += 180
                }
            break;
            case "ArrowLeft":
                if (this.x > 60){
                    this.x -= 50
                }
            break;
            case "ArrowRight":
                if (this.x < 440){
                    this.x += 50
                }
            break;
            case "KeyF":
                console.log("Pegou")
            // case "Spacebar":
            //     this.extinguishFire() Implementar caso tudo corra corretamente
        }
    }
    drawWindow(x ,y){
        const image = new Image ()
        image.src = "./image/window-clear.png" //Imagem do foguinho
        // setInterval(() => {
        //     this.drawFire()
        // }, 90);
        context.drawImage(image, x, y, 60, 60)
    }
}