var entity = (function (state, entity) {
    entity = entity || {};
    this.state = state;
    this.x = entity.x || 0;
    this.y = entity.y || 0;
    this.width = entity.width || 0;
    this.height = entity.height || 0;
    this.rotation = entity.rotation || 0;
});

entity.prototype.update = function () { };

entity.prototype.draw = function (ctx) { };
var boat = (function (state, boat) {
    boat = boat || {};
    entity.call(this, state, boat);
    this.currentMovementSpeed = 0;
    this.setSpeed(boat);
});

boat.prototype = Object.create(entity.prototype);
boat.prototype.constructor = boat;

boat.prototype.setSpeed = function (options) {
    // forwards
    this.forwardSpeed = options.forwardSpeed || this.forwardSpeed || 0;
    this.topForwardSpeed = options.topForwardSpeed || this.topForwardSpeed || 0;
    // backward
    this.backwardSpeed = options.backwardSpeed || this.backwardSpeed || 0;
    this.rotateSpeed = options.rotateSpeed || this.rotateSpeed || 0;
};

boat.prototype.draw = function (ctx) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.translate(0, -this.height / 2)
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.width - (this.width * 0.33), 0);
    ctx.lineTo(this.width, this.height / 2);
    ctx.lineTo(this.width - (this.width * 0.33), this.height);
    ctx.lineTo(0, this.height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore()
};
var player = (function (state, player) {
    player = player || {};
    boat.call(this, state, player);
    this.input = this.state.input;
});

player.prototype = Object.create(boat.prototype);
player.prototype.constructor = player;

player.prototype.update = function () {
    if (this.input.getKey(KeyCode.UpArrow)) {
        // increase current movement speed
        this.currentMovementSpeed = clamp(this.currentMovementSpeed + this.forwardSpeed, 0, this.topForwardSpeed);
    }
    if (this.input.getKey(KeyCode.DownArrow)) {
        // slow down movement speed
       this.currentMovementSpeed = clamp(this.currentMovementSpeed - this.backwardSpeed, 0, this.topForwardSpeed);
    }

    // IMPORTANT: CHANGE ROTATION SPEED ACCORDING TO MOVEMENT SPEED
    if (this.input.getKey(KeyCode.LeftArrow)) {
        this.rotation -= this.rotateSpeed;
    }
    if (this.input.getKey(KeyCode.RightArrow)) {
        this.rotation += this.rotateSpeed;
    }

    this.x += Math.cos(this.rotation) * this.currentMovementSpeed;
    this.y += Math.sin(this.rotation) * this.currentMovementSpeed;
};
var shipio = (function (stella) {
    this.stella = stella;
    this.input = this.stella.input;

    this.grid = new grid({ width: 300, height: 300, blockSize: 45 });
    this.localPlayer = new player(this, { x: 100, y: 100, width: 75, height: 50 });
    this.localPlayer.setSpeed({ forwardSpeed: 0.023, topForwardSpeed: 3, backwardSpeed: 0.01, rotateSpeed: 0.05 })
});

shipio.prototype.update = function () {
    this.localPlayer.update();
};

shipio.prototype.draw = function (ctx) {
    this.grid.draw(ctx);
    this.localPlayer.draw(ctx);

    if (DEBUG_MODE) {
        ctx.fillStyle = "white";
        ctx.font = "18px Calibri";
        ctx.textBaseline = "top";
        var debug_player =
            `player1
x ${this.localPlayer.x} y ${this.localPlayer.y} 
speed ${this.localPlayer.currentMovementSpeed}`
        drawText(ctx, 0, 0, debug_player, 18);
    }
};