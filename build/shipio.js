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

boat.prototype.draw = function (ctx, xView, yView) {
  /*  ctx.fillStyle = "white";
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
    ctx.restore()*/

    		ctx.save();		
			ctx.fillStyle = "black";
			ctx.fillRect((this.x-this.width/2) - xView, (this.y-this.height/2) - yView, this.width, this.height);
			ctx.restore();			
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

    //World bounds
    var camera = this.state.camera;
    if (this.x - this.width < 0) {
        this.x = this.width;
    }
    if (this.y - this.height < 0) {
        this.y = this.height;
    }
    if (this.x + this.width > camera.worldWidth) {
        this.x = camera.worldWidth - this.width;
    }
    if (this.y + this.height > camera.worldHeight) {
        this.y = camera.worldHeight - this.height;
    }
};
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