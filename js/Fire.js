class Fire {
    constructor(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    drawFire(){
        const image = new Image ()
        image.src = "./image/fireDrop-nobg.png" //Imagem do foguinho
        // setInterval(() => {
        //     this.drawFire()
        // }, 90);
        context.drawImage(image, this.x, this.y, this.width, this.height)
    }
}