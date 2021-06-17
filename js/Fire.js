
class Fire {
    constructor(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    drawFire(source){
        const image = new Image ()
        image.src = source //Imagem do foguinho "./image/fireDrop-nobg.png"
        // setInterval(() => {
        //     this.drawFire()
        // }, 90);
        context.drawImage(image, this.x, this.y, this.width, this.height)
    }
}