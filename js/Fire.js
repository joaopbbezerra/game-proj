class Fire {
    constructor(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    draw(){
        const image = new Image ()
        image.src = "" //Imagem do foguinho
        context.drawImage(image, this.x, this.y, this.width, this.height)
    }
}