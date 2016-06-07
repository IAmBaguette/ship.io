var shipio = (function (stella) {
    this.stella = stella;
    this.input = this.stella.input;

    var screenSize = this.stella.getScreenSize();
    this.camera = new camera({ viewWidth: screenSize.width, viewHeight: screenSize.height, worldWidth: 3000, worldHeight: 3000 })
    this.grid = new grid({ width: 3000, height: 3000, blockSize: 45 });
    this.localPlayer = new player(this, { x: 100, y: 100, width: 75, height: 50 });
    this.localPlayer.setSpeed({ forwardSpeed: 0.023, topForwardSpeed: 3, backwardSpeed: 0.01, rotateSpeed: 0.05 })
    this.camera.follow(this.localPlayer, screenSize.width / 2, screenSize.height / 2);
});

shipio.prototype.update = function () {
    this.camera.update();
    this.localPlayer.update();
};

shipio.prototype.draw = function (ctx) {
    var viewport = this.camera.viewport;
    this.grid.draw(ctx, viewport.x, viewport.y);
    this.localPlayer.draw(ctx, viewport.x, viewport.y);

    if (DEBUG_MODE) {
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.textBaseline = "top";
        var debug_player =
            `player1
x ${this.localPlayer.x} y ${this.localPlayer.y} 
speed ${this.localPlayer.currentMovementSpeed}
cam x${viewport.x} y${viewport.y}`
        drawText(ctx, 0, 0, debug_player, 18);
    }
};