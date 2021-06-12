class Fire {
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 60
        this.height = 60
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