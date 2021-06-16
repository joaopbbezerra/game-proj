class Cat {
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 50
        this.height = 50
    }
    drawCat(){
        const image = new Image ()
        image.src = "./image/cat-meow.png" //Imagem do foguinho
        // setInterval(() => {
        //     this.drawFire()
        // }, 90);
        context.drawImage(image, this.x, this.y, this.width, this.height)
    }
}