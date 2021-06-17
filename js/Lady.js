class Lady {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 60;
  }
  drawLady(source) {
    const image = new Image();
    image.src = source;
    // setInterval(() => {
    //     this.drawFire()
    // }, 90);
    context.drawImage(image, this.x, this.y, this.width, this.height);
  }
}
