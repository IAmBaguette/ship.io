var shipio = (function (stella) {
    this.stella = stella;
    this.input = this.stella.input;
    
    this.localPlayer = new player(this, { x: 100, y: 100, width: 100, height: 75, movementSpeed: 3, rotateSpeed: 0.05 });
});

shipio.prototype.update = function () {
    this.localPlayer.update();
};

shipio.prototype.draw = function (ctx) {
    ctx.fillStyle = "white";
    this.localPlayer.draw(ctx);
};