class Fire {
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 50
        this.height = 50
    }
    drawFire(){
        const image = new Image ()
        image.src = "./image/fire_dropping_noBackground.png" //Imagem do foguinho
        context.drawImage(image, this.x, this.y, this.width, this.height)
        // setInterval(() => {
        //     this.drawFire()
        // }, 90);
    }
}