var shipio = (function (stella) {
    this.stella = stella;
    this.input = this.stella.input;

    this.grid = new grid({ width: 300, height: 300, blockSize: 45 });
    this.localPlayer = new player(this, { x: 100, y: 100, width: 100, height: 75 });
    this.localPlayer.setSpeed({ forwardSpeed: 0.023, topForwardSpeed: 3, backwardSpeed: 0.01, rotateSpeed: 0.05 })
});

shipio.prototype.update = function () {
    this.localPlayer.update();
};

shipio.prototype.draw = function (ctx) {
    ctx.fillStyle = "white";
    this.grid.draw(ctx);
    this.localPlayer.draw(ctx);

    if (DEBUG_MODE) {
        ctx.font = "18px Calibri";
        ctx.textBaseline = "top";
        var debug_player =
            `player1
x ${this.localPlayer.x} y ${this.localPlayer.y} 
speed ${this.localPlayer.currentMovementSpeed}`
        drawText(ctx, 0, 0, debug_player, 18);
    }
};