class Cat {
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 50
        this.height = 50
    }
    drawCat(source){
        const image = new Image ()
        image.src = source //Imagem do foguinho "./image/cat-meow.png"
        // setInterval(() => {
        //     this.drawFire()
        // }, 90);
        context.drawImage(image, this.x, this.y, this.width, this.height)
    }
}